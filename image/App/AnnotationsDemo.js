var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var USE_ImageViewerAutomationControl = true;
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Basic;
        (function (Basic) {
            var AnnotationsDemo;
            (function (AnnotationsDemo) {
                var AnnotationsDemoApp = (function (_super) {
                    __extends(AnnotationsDemoApp, _super);
                    function AnnotationsDemoApp() {
                        var _this = this;
                        _super.apply(this, arguments);
                        this.annMedicalPackPackage = new lt.Annotations.UserMedicalPack.AnnMedicalPack;
                        this.isMedicalPackLoaded = false;
                        this._demoImages = [
                            new Basic.DemoImage("OCR1.jpg", true, 300, false),
                            new Basic.DemoImage("PngImage.png", false, 0, false),
                        ];
                        this._demoName = "LEADTOOLS JavaScript Annotations Demo";
                        this._demoUI = {
                            annotationObjectsBtns: ".icon-ann[value]",
                            loadAnnotationsBtn: "#loadAnnotations",
                            saveAnnotationsBtn: "#saveAnnotations",
                            loadBatesStampBtn: "#loadBatesStamp",
                            undoBtn: "#undo",
                            redoBtn: "#redo",
                            deleteAnnotationBtn: "#deleteAnnotation",
                            duplicateBtn: "#duplicate",
                            lockObjectBtn: "#lockObject",
                            unlockObjectBtn: "#unlockObject",
                            applyEncryptorBtn: "#applyEncryptor",
                            applyDecryptorBtn: "#applyDecryptor",
                            realizeRedactBtn: "#realizeRedact",
                            restoreRedactBtn: "#restoreRedact",
                            annotationsPropertiesBtn: "#annotationsProperties",
                            objectsAlignmentOptionsBtn: "#objectsAlignmentOptions",
                            burnAnnotationsBtn: "#burnAnnotations",
                            runUserModeBtn: "#runUserMode",
                            designUserModeBtn: "#designUserMode",
                            documentAnnotationsBtn: "#documentAnnotations",
                            medicalAnnotationsBtn: "#medicalAnnotations",
                            notificationRoot: "#notificationRoot"
                        };
                        this._shownNotification = -1;
                        this._shownDialogOnce = false;
                        this.documentPackDialog_Hide = function (objectID) {
                            _this.setCurrentObjectId(objectID);
                        };
                        this.medicalPackDialog_Hide = function (objectID) {
                            _this.setCurrentObjectId(objectID);
                        };
                        this.snapToGridPropertiesDialog_Hide = function () {
                            _this.automationControl.automationInvalidate(lt.LeadRectD.empty);
                        };
                        this.objectsAlignmentDialog_Hide = function (actionId) {
                            switch (actionId) {
                                case Demos.Annotations.ObjectsAlignment.toLeft:
                                    _this.activeAutomation.alignLefts();
                                    break;
                                case Demos.Annotations.ObjectsAlignment.toCenter:
                                    _this.activeAutomation.alignCenters();
                                    break;
                                case Demos.Annotations.ObjectsAlignment.toRight:
                                    _this.activeAutomation.alignRights();
                                    break;
                                case Demos.Annotations.ObjectsAlignment.toTop:
                                    _this.activeAutomation.alignTops();
                                    break;
                                case Demos.Annotations.ObjectsAlignment.toMiddle:
                                    _this.activeAutomation.alignMiddles();
                                    break;
                                case Demos.Annotations.ObjectsAlignment.toBottom:
                                    _this.activeAutomation.alignBottoms();
                                    break;
                                case Demos.Annotations.ObjectsAlignment.sameWidth:
                                    _this.activeAutomation.makeSameWidth();
                                    break;
                                case Demos.Annotations.ObjectsAlignment.sameHeight:
                                    _this.activeAutomation.makeSameHeight();
                                    break;
                                case Demos.Annotations.ObjectsAlignment.sameSize:
                                    _this.activeAutomation.makeSameSize();
                                    break;
                            }
                            _this.automationControl.automationInvalidate(lt.LeadRectD.empty);
                        };
                        this.automationUpdateObjectDialog_Hide = function () {
                            _this.isDialogOpen = false;
                            _this.updateUIState();
                        };
                    }
                    AnnotationsDemoApp.prototype.run = function () {
                        _super.prototype.run.call(this);
                        this.initAutomation();
                        this.createDemoAutomations(2);
                    };
                    AnnotationsDemoApp.prototype._initUI = function () {
                        _super.prototype._initUI.call(this);
                        document.getElementById(this._commonUI.imageViewerDiv).addEventListener("contextmenu", function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        }, true);
                        this._notificationGroup = new Demos.Utils.NotificationGroup($(this._demoUI.notificationRoot));
                        if (lt.LTHelper.OS == lt.LTOS.iOS) {
                            $(this._demoUI.loadAnnotationsBtn).hide();
                            $(this._demoUI.saveAnnotationsBtn).hide();
                            $(this._demoUI.loadBatesStampBtn).hide();
                        }
                        var hideSelector = ".dlg-close, .dlg-close-x";
                        this.automationUpdateObjectDialog = new Demos.Annotations.AutomationUpdateObjectDialog($("#automationUpdateObjectDialog"), {
                            properties: {
                                tab: "#auoDlg_propertiesTab",
                                page: "#auoDlg_propertiesPage"
                            },
                            content: {
                                tab: "#auoDlg_contentTab",
                                page: "#auoDlg_contentPage"
                            },
                            reviews: {
                                tab: "#auoDlg_reviewsTab",
                                page: "#auoDlg_reviewsPage"
                            },
                            hide: hideSelector
                        });
                        this.automationUpdateObjectDialog.onHide = this.automationUpdateObjectDialog_Hide;
                        this.passwordDialog = new Demos.Annotations.PasswordDialog($("#automationPasswordDialog"), {
                            title: "#passwordDialogName",
                            input: "#objectPassword",
                            submit: "#automationPasswordDlg_Action",
                            hide: hideSelector
                        });
                        this.mediaPlayerDialog = new Demos.Annotations.MediaPlayerDialog($("#mediaPlayerDialog"), {
                            videoObject: "#videoObject",
                            hide: hideSelector
                        });
                        this.audioPlayerDialog = new Demos.Annotations.AudioPlayerDialog($("#audioPlayerDialog"), {
                            audioObject: "#audioObject",
                            hide: hideSelector
                        });
                        this.documentPackDialog = new Demos.Annotations.DocumentPackDialog($("#documentPackDialog"), {
                            objects: "button.icon",
                            hide: hideSelector
                        });
                        this.documentPackDialog.onHide = this.documentPackDialog_Hide;
                        this.medicalPackDialog = new Demos.Annotations.MedicalPackDialog($("#medicalPackDialog"), {
                            objects: "button.icon",
                            hide: hideSelector
                        });
                        this.medicalPackDialog.onHide = this.medicalPackDialog_Hide;
                        this.snapToGridPropertiesDialog = new Demos.Annotations.SnapToGridPropertiesDialog($("#snapToGridPropertiesDialog"), {
                            showGridCheckbox: "#snapToGridPropertiesShowGridInput",
                            gridColorSelect: "#snapToGridPropertiesGridColorSelect",
                            lineStyleSelect: "#snapToGridPropertiesLineStyleSelect",
                            gridLength: "#snapToGridPropertiesGridLengthInput",
                            lineSpacing: "#snapToGridPropertiesLineSpacingInput",
                            enableSnapCheckbox: "#snapToGridPropertiesEnableSnapInput",
                            apply: "#snapToGridPropertiesOkBtn",
                            hide: hideSelector
                        });
                        this.snapToGridPropertiesDialog.onHide = this.snapToGridPropertiesDialog_Hide;
                        this.objectsAlignmentDialog = new Demos.Annotations.ObjectsAlignmentDialog($("#objectsAlignmentDialog"), {
                            enabledCheckbox: "#objectsAlignmentDialogEnableCheckBox",
                            objectAlignments: ".icon-object",
                            hide: hideSelector
                        });
                        this.objectsAlignmentDialog.onApply = this.objectsAlignmentDialog_Hide;
                        this.loadSaveHelper = new AnnotationsDemo.AnnotationLoadSaveHelper();
                        this.richTextDialog = new Demos.Annotations.RichTextDialog($("#richTextEditorDialog"), {
                            editor: "#richTextEditor",
                            hide: hideSelector
                        });
                        this.richTextDialog.onHide = this.richTextDialog_Hide.bind(this);
                        $(this._demoUI.annotationObjectsBtns).on("click", this.annotationsObjectsBtns_BtnClicked.bind(this));
                        $(this._demoUI.loadAnnotationsBtn).on("click", this.loadAnnotationsBtn_Click.bind(this));
                        $(this._demoUI.saveAnnotationsBtn).on("click", this.saveAnnotationsBtn_Click.bind(this));
                        $(this._demoUI.loadBatesStampBtn).on("click", this.loadBatesStampBtn_Click.bind(this));
                        $(this._demoUI.undoBtn).on("click", this.undoBtn_Click.bind(this));
                        $(this._demoUI.redoBtn).on("click", this.redoBtn_Click.bind(this));
                        $(this._demoUI.deleteAnnotationBtn).on("click", this.deleteAnnotationBtn_Click.bind(this));
                        $(this._demoUI.duplicateBtn).on("click", this.duplicateBtn_Click.bind(this));
                        $(this._demoUI.lockObjectBtn).on("click", this.lockObjectBtn_Click.bind(this));
                        $(this._demoUI.unlockObjectBtn).on("click", this.unlockObjectBtn_Click.bind(this));
                        $(this._demoUI.applyEncryptorBtn).on("click", this.applyEncryptorBtn_Click.bind(this));
                        $(this._demoUI.applyDecryptorBtn).on("click", this.applyDecryptorBtn_Click.bind(this));
                        $(this._demoUI.realizeRedactBtn).on("click", this.realizeRedactBtn_Click.bind(this));
                        $(this._demoUI.restoreRedactBtn).on("click", this.restoreRedactBtn_Click.bind(this));
                        $(this._demoUI.annotationsPropertiesBtn).on("click", this.annotationsPropertiesBtn_Click.bind(this));
                        $(this._demoUI.objectsAlignmentOptionsBtn).on("click", this.objectsAlignmentOptionsBtn_Click.bind(this));
                        $(this._demoUI.burnAnnotationsBtn).on("click", this.burnAnnotationsBtn_Click.bind(this));
                        $(this._demoUI.runUserModeBtn).on("click", this.runUserModeBtn_Click.bind(this));
                        $(this._demoUI.designUserModeBtn).on("click", this.designUserModeBtn_Click.bind(this));
                        $(this._demoUI.documentAnnotationsBtn).on("click", this.documentAnnotationsBtn_BtnClicked.bind(this));
                        $(this._demoUI.medicalAnnotationsBtn).on("click", this.medicalAnnotationsBtn_BtnClicked.bind(this));
                        this.isDialogOpen = false;
                        $(document).bind("keydown", this.window_keydown.bind(this));
                    };
                    AnnotationsDemoApp.prototype.window_keydown = function (e) {
                        if (e.keyCode == 46 && this.isDialogOpen == false)
                            this.deleteAnnotationBtn_Click(e);
                    };
                    AnnotationsDemoApp.prototype.initAutomation = function () {
                        var _this = this;
                        this.automationManager = new lt.Annotations.Automation.AnnAutomationManager();
                        this.automationManager.createDefaultObjects();
                        this.automationManager.editTextAfterDraw = true;
                        this.automationManager.editContentAfterDraw = true;
                        this.renderingEngine = new lt.Annotations.Rendering.AnnHtml5RenderingEngine();
                        this.automationManager.renderingEngine = this.renderingEngine;
                        var resources = this.loadResources();
                        this.automationManager.resources = resources;
                        var triangle = new AnnotationsDemo.AnnTriangleObject();
                        var triangleAutomation = this.createTriangleAutomationObject(triangle);
                        var automationObjects = this.automationManager.objects;
                        automationObjects.add(triangleAutomation);
                        var richText = new AnnotationsDemo.AnnRichTextObject();
                        var richTextAutomation = this.createRichTextAutomationObject(richText);
                        var automationObjects = this.automationManager.objects;
                        automationObjects.add(richTextAutomation);
                        this.renderingEngine.loadPicture.add(function (sender, e) { return _this.renderingEngine_LoadPicture(sender, e); });
                        this.managerHelper = new Demos.Annotations.AutomationManagerHelper(this.automationManager, "Resources");
                        var isDesktop = (lt.LTHelper.device === lt.LTDevice.desktop);
                        var automationObjectsCount = automationObjects.count;
                        for (var i = 0; i < automationObjectsCount; ++i) {
                            var automationObject = automationObjects.item(i);
                            var annObjectTemplate = automationObject.objectTemplate;
                            if (annObjectTemplate != null) {
                                automationObject.drawCursor = this.managerHelper.getAutomationObjectCursor(automationObject.id);
                                if (!isDesktop && annObjectTemplate.supportsStroke) {
                                    var stroke = annObjectTemplate.stroke;
                                    stroke.strokeThickness = lt.LeadLengthD.create(2);
                                    annObjectTemplate.stroke = stroke;
                                }
                                var isAudioObject = annObjectTemplate instanceof lt.Annotations.Core.AnnAudioObject;
                                if (isAudioObject) {
                                    var audioObject = annObjectTemplate;
                                    audioObject.media.source1 = "http://demo.leadtools.com/media/mp3/NewAudio.mp3";
                                    audioObject.media.type1 = "audio/mp3";
                                    audioObject.media.source2 = "http://demo.leadtools.com/media/wav/newaudio.wav";
                                    audioObject.media.type2 = "audio/wav";
                                    audioObject.media.source3 = "http://demo.leadtools.com/media/OGG/NewAudio_uncompressed.ogg";
                                    audioObject.media.type3 = "audio/ogg";
                                }
                                else if (annObjectTemplate instanceof lt.Annotations.Core.AnnMediaObject) {
                                    var videoObject = annObjectTemplate;
                                    videoObject.media.source1 = "http://demo.leadtools.com/media/mp4/dada_h264.mp4";
                                    videoObject.media.type1 = "video/mp4";
                                    videoObject.media.source2 = "http://demo.leadtools.com/media/WebM/DaDa_VP8_Vorbis.mkv";
                                    videoObject.media.type2 = "video/webm";
                                    videoObject.media.source3 = "http://demo.leadtools.com/media/OGG/DaDa_Theora_Vorbis.ogg";
                                    videoObject.media.type3 = "video/ogg";
                                }
                                annObjectTemplate.hyperlink = "https://www.leadtools.com";
                            }
                        }
                        this.fixedTextPadding(this.renderingEngine, false);
                    };
                    AnnotationsDemoApp.prototype.fixedTextPadding = function (engine, enable) {
                        for (var key in engine.renderers) {
                            var annTextObjectRenderer = engine.renderers[key];
                            if (annTextObjectRenderer != null)
                                annTextObjectRenderer.fixedPadding = enable;
                        }
                    };
                    AnnotationsDemoApp.prototype.loadResources = function () {
                        var resources = new lt.Annotations.Core.AnnResources();
                        var rubberStampsResources = resources.rubberStamps;
                        var imagesResources = resources.images;
                        var objects = "Resources/Objects/";
                        var rubberStamps = "Resources/Objects/RubberStamps/";
                        var StampType = lt.Annotations.Core.AnnRubberStampType;
                        var AnnPic = lt.Annotations.Core.AnnPicture;
                        rubberStampsResources[StampType.stampApproved] = new AnnPic(rubberStamps + "Approved.png");
                        rubberStampsResources[StampType.stampAssigned] = new AnnPic(rubberStamps + "Assigned.png");
                        rubberStampsResources[StampType.stampClient] = new AnnPic(rubberStamps + "Client.png");
                        rubberStampsResources[StampType.stampChecked] = new AnnPic(rubberStamps + "Checked.png");
                        rubberStampsResources[StampType.stampCopy] = new AnnPic(rubberStamps + "Copy.png");
                        rubberStampsResources[StampType.stampDraft] = new AnnPic(rubberStamps + "Draft.png");
                        rubberStampsResources[StampType.stampExtended] = new AnnPic(rubberStamps + "Extended.png");
                        rubberStampsResources[StampType.stampFax] = new AnnPic(rubberStamps + "Fax.png");
                        rubberStampsResources[StampType.stampFaxed] = new AnnPic(rubberStamps + "Faxed.png");
                        rubberStampsResources[StampType.stampImportant] = new AnnPic(rubberStamps + "Important.png");
                        rubberStampsResources[StampType.stampInvoice] = new AnnPic(rubberStamps + "Invoice.png");
                        rubberStampsResources[StampType.stampNotice] = new AnnPic(rubberStamps + "Notice.png");
                        rubberStampsResources[StampType.stampPaid] = new AnnPic(rubberStamps + "Paid.png");
                        rubberStampsResources[StampType.stampOfficial] = new AnnPic(rubberStamps + "Official.png");
                        rubberStampsResources[StampType.stampOnFile] = new AnnPic(rubberStamps + "Onfile.png");
                        rubberStampsResources[StampType.stampPassed] = new AnnPic(rubberStamps + "Passed.png");
                        rubberStampsResources[StampType.stampPending] = new AnnPic(rubberStamps + "Pending.png");
                        rubberStampsResources[StampType.stampProcessed] = new AnnPic(rubberStamps + "Processed.png");
                        rubberStampsResources[StampType.stampReceived] = new AnnPic(rubberStamps + "Received.png");
                        rubberStampsResources[StampType.stampRejected] = new AnnPic(rubberStamps + "Rejected.png");
                        rubberStampsResources[StampType.stampRelease] = new AnnPic(rubberStamps + "Release.png");
                        rubberStampsResources[StampType.stampSent] = new AnnPic(rubberStamps + "Sent.png");
                        rubberStampsResources[StampType.stampShipped] = new AnnPic(rubberStamps + "Shipped.png");
                        rubberStampsResources[StampType.stampTopSecret] = new AnnPic(rubberStamps + "TopSecret.png");
                        rubberStampsResources[StampType.stampUrgent] = new AnnPic(rubberStamps + "Urgent.png");
                        rubberStampsResources[StampType.stampVoid] = new AnnPic(rubberStamps + "Void.png");
                        imagesResources[0] = new AnnPic(objects + "Point.png");
                        imagesResources[1] = new AnnPic(objects + "Lock.png");
                        imagesResources[2] = new AnnPic(objects + "Hotspot.png");
                        imagesResources[3] = new AnnPic(objects + "Audio.png");
                        imagesResources[4] = new AnnPic(objects + "Video.png");
                        imagesResources[5] = new AnnPic(objects + "EncryptPrimary.png");
                        imagesResources[6] = new AnnPic(objects + "EncryptSecondary.png");
                        imagesResources[7] = new AnnPic(objects + "Note.png");
                        imagesResources[8] = new AnnPic(objects + "StickyNote.png");
                        return resources;
                    };
                    AnnotationsDemoApp.prototype.createTriangleAutomationObject = function (annObject) {
                        var triangleObjectId = -99;
                        var automationObj = new lt.Annotations.Automation.AnnAutomationObject();
                        automationObj.id = triangleObjectId;
                        automationObj.name = "Triangle";
                        automationObj.drawDesignerType = AnnotationsDemo.AnnTriangleDrawDesigner;
                        automationObj.editDesignerType = AnnotationsDemo.AnnTriangleEditDesigner;
                        automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;
                        var annTriangleRenderer = new AnnotationsDemo.AnnTriangleRenderer();
                        var annPolylineRenderer = this.renderingEngine.renderers[lt.Annotations.Core.AnnObject.polylineObjectId];
                        annTriangleRenderer.locationsThumbStyle = annPolylineRenderer.locationsThumbStyle;
                        annTriangleRenderer.rotateCenterThumbStyle = annPolylineRenderer.rotateCenterThumbStyle;
                        annTriangleRenderer.rotateGripperThumbStyle = annPolylineRenderer.rotateGripperThumbStyle;
                        this.renderingEngine.renderers[triangleObjectId] = annTriangleRenderer;
                        automationObj.objectTemplate = annObject;
                        this.renderingEngine.renderers[triangleObjectId] = annTriangleRenderer;
                        annTriangleRenderer.initialize(this.renderingEngine);
                        return automationObj;
                    };
                    AnnotationsDemoApp.prototype.createRichTextAutomationObject = function (annObject) {
                        var RichTextObjectId = -200;
                        var automationObj = new lt.Annotations.Automation.AnnAutomationObject();
                        automationObj.id = RichTextObjectId;
                        automationObj.name = "RichText";
                        automationObj.drawDesignerType = AnnotationsDemo.AnnRichTextDrawDesigner;
                        automationObj.editDesignerType = AnnotationsDemo.AnnRichTextEditDesigner;
                        automationObj.runDesignerType = lt.Annotations.Designers.AnnRunDesigner;
                        var annRichTextRenderer = new AnnotationsDemo.AnnRichTextRenderer();
                        var annRectangleRenderer = this.renderingEngine.renderers[lt.Annotations.Core.AnnObject.rectangleObjectId];
                        annRichTextRenderer.locationsThumbStyle = annRectangleRenderer.locationsThumbStyle;
                        annRichTextRenderer.rotateCenterThumbStyle = annRectangleRenderer.rotateCenterThumbStyle;
                        annRichTextRenderer.rotateGripperThumbStyle = annRectangleRenderer.rotateGripperThumbStyle;
                        this.renderingEngine.renderers[RichTextObjectId] = annRichTextRenderer;
                        automationObj.objectTemplate = annObject;
                        this.renderingEngine.renderers[RichTextObjectId] = annRichTextRenderer;
                        annRichTextRenderer.initialize(this.renderingEngine);
                        return automationObj;
                    };
                    AnnotationsDemoApp.prototype.renderingEngine_LoadPicture = function (sender, e) {
                        this.activeAutomation.invalidate(lt.LeadRectD.empty);
                    };
                    AnnotationsDemoApp.prototype._initViewer = function () {
                        var _this = this;
                        var createOptions = new lt.Controls.ImageViewerCreateOptions(document.getElementById('imageViewerDiv'));
                        if (USE_ImageViewerAutomationControl) {
                            this._imageViewer = new lt.Controls.ImageViewer(createOptions);
                            this.automationControl = new Demos.Annotations.ImageViewerAutomationControl();
                            this.automationControl.imageViewer = this._imageViewer;
                        }
                        else {
                            this._imageViewer = new Demos.Annotations.AutomationImageViewer(createOptions);
                            this.automationControl = this._imageViewer;
                        }
                        this._imageViewer.autoCreateCanvas = true;
                        this._imageViewer.itemError.add(function (sender, e) { return _this._viewer_ItemError(sender, e); });
                        this._imageViewer.itemChanged.add(function (sender, e) { return _this._viewer_ItemChanged(sender, e); });
                        this._imageViewer.viewHorizontalAlignment = lt.Controls.ControlAlignment.center;
                        this._imageViewer.viewVerticalAlignment = lt.Controls.ControlAlignment.center;
                        this._imageViewer.autoResetOptions = lt.Controls.ImageViewerAutoResetOptions.all;
                        if (lt.LTHelper.msPointerEnabled && !lt.LTHelper.supportsMouse)
                            this._imageViewer.scrollMode = lt.Controls.ControlScrollMode.hidden;
                    };
                    AnnotationsDemoApp.prototype._viewer_ItemChanged = function (sender, e) {
                        if (e.reason == lt.Controls.ImageViewerItemChangedReason.url) {
                            this._endOperation(true);
                            var canvasDataProvider = new Demos.Annotations.CanvasDataProvider(this._imageViewer.activeItem.canvas);
                            this.automationControl.automationDataProvider = canvasDataProvider;
                            if (!this.isMedicalPackLoaded) {
                                this.annMedicalPackPackage = new lt.Annotations.UserMedicalPack.AnnMedicalPack();
                                this.managerHelper.LoadPackage(this.annMedicalPackPackage);
                                this.isMedicalPackLoaded = true;
                            }
                            this.updateUIState();
                        }
                    };
                    AnnotationsDemoApp.prototype.createDemoAutomations = function (imageNumber) {
                        var _this = this;
                        for (var i = 0; i < imageNumber; i++) {
                            var automation = new lt.Annotations.Automation.AnnAutomation(this.automationManager, this.automationControl);
                            automation.draw.add(function (sender, e) { return _this.automation_Draw(sender, e); });
                            automation.editText.add(function (sender, e) { return _this.automation_EditText(sender, e); });
                            automation.editContent.add(function (sender, e) { return _this.automation_EditContent(sender, e); });
                            automation.run.add(function (sender, e) { return _this.automation_Run(sender, e); });
                            automation.setCursor.add(function (sender, e) { return _this.automation_SetCursor(sender, e); });
                            automation.restoreCursor.add(function (sender, e) { return _this.automation_RestoreCursor(sender, e); });
                            automation.selectedObjectsChanged.add(function (sender, e) { return _this.automation_SelectedObjectsChanged(sender, e); });
                            automation.onShowObjectProperties.add(function (sender, e) { return _this.automation_OnShowObjectProperties(sender, e); });
                            automation.afterObjectChanged.add(function (sender, e) { return _this.automation_AfterObjectChanged(sender, e); });
                        }
                    };
                    AnnotationsDemoApp.prototype.automation_OnShowObjectProperties = function (sender, e) {
                        this.showAutomationUpdateObjectDialog(true, true, true, this.activeAutomation.currentEditObject);
                    };
                    AnnotationsDemoApp.prototype.automation_Draw = function (sender, e) {
                        if (e.operationStatus == lt.Annotations.Core.AnnDesignerOperationStatus.end) {
                            this.updateAnnotationsObjectsBtnsCheckedState();
                        }
                    };
                    AnnotationsDemoApp.prototype.automation_EditText = function (sender, e) {
                        var _this = this;
                        var automation = this.activeAutomation;
                        if (automation == null)
                            return;
                        this.removeAutomationTextArea(true);
                        if (e.textObject == null)
                            return;
                        var imageViewer = this._imageViewer;
                        this.automationTextArea = new Demos.Annotations.AutomationTextArea(imageViewer.mainDiv.parentNode, automation, e, function (update) { return _this.removeAutomationTextArea(update); });
                        e.cancel;
                    };
                    AnnotationsDemoApp.prototype.automation_EditContent = function (sender, e) {
                        var automation = this.activeAutomation;
                        if (automation == null)
                            return;
                        if (e.targetObject == null)
                            return;
                        if (e.targetObject.id == -200) {
                            $(this.richTextDialog.richTextEditor).jqteVal(e.targetObject.richTextString);
                            this.isDialogOpen = true;
                            this.richTextDialog.show();
                            return;
                        }
                        if (!e.targetObject.supportsContent || lt.Annotations.Core.AnnSelectionObject.isInstanceOfType(e.targetObject))
                            return;
                        if (lt.Annotations.Designers.AnnDrawDesigner.isInstanceOfType(sender) && e.targetObject.id != lt.Annotations.Core.AnnObject.stickyNoteObjectId)
                            return;
                        this.showAutomationUpdateObjectDialog(false, false, true, e.targetObject);
                    };
                    AnnotationsDemoApp.prototype.removeAutomationTextArea = function (update) {
                        if (this.automationTextArea == null)
                            return;
                        this.automationTextArea.remove(update);
                        this.automationTextArea = null;
                    };
                    AnnotationsDemoApp.prototype.automation_Run = function (sender, e) {
                        if (e.operationStatus === lt.Annotations.Core.AnnDesignerOperationStatus.start) {
                            var hyperlink = e.object.hyperlink;
                            var id = e.object.id;
                            if (id === lt.Annotations.Core.AnnObject.textRollupObjectId)
                                return;
                            if (id === lt.Annotations.Core.AnnObject.mediaObjectId) {
                                var mediaObject = e.object;
                                this.mediaPlayerDialog.play(mediaObject.media.source1, mediaObject.media.source2, mediaObject.media.source3);
                            }
                            else if (id == lt.Annotations.Core.AnnObject.audioObjectId) {
                                var audioObject = e.object;
                                this.audioPlayerDialog.play(audioObject.media.source1, audioObject.media.source2, audioObject.media.source3);
                            }
                            else if (!!hyperlink) {
                                var oWin = null;
                                var strings = hyperlink.split("//");
                                if (strings != null && strings.length < 2) {
                                    hyperlink = "http://" + hyperlink;
                                }
                                if (lt.LTHelper.browser == lt.LTBrowser.internetExplorer) {
                                    oWin = window.open("");
                                    oWin.navigate(hyperlink);
                                }
                                else {
                                    oWin = window.open(hyperlink);
                                }
                                if (oWin == null || typeof oWin == 'undefined') {
                                    alert('Your Popup Blocker has blocked opening this hyperlink. Disable the Popup Blocker for this web site and try again.');
                                }
                            }
                        }
                    };
                    AnnotationsDemoApp.prototype.automation_SetCursor = function (sender, e) {
                        var imageViewer = this._imageViewer;
                        if (imageViewer.workingInteractiveMode != null && imageViewer.workingInteractiveMode != this.automationInteractiveMode)
                            return;
                        var automation = sender;
                        var newCursor = null;
                        switch (e.designerType) {
                            case lt.Annotations.Automation.AnnDesignerType.draw:
                                {
                                    var allow = true;
                                    var drawDesigner = automation.currentDesigner;
                                    if (drawDesigner != null && !drawDesigner.isTargetObjectAdded && e.pointerEvent != null) {
                                        var container = automation.activeContainer;
                                        allow = false;
                                        if (automation.hitTestContainer(e.pointerEvent.location, false) != null)
                                            allow = true;
                                    }
                                    if (allow) {
                                        var annAutomationObject = automation.manager.findObjectById(e.id);
                                        if (annAutomationObject != null)
                                            newCursor = annAutomationObject.drawCursor;
                                    }
                                    else {
                                        newCursor = "not-allowed";
                                    }
                                }
                                break;
                            case lt.Annotations.Automation.AnnDesignerType.edit:
                                if (e.isRotateCenter)
                                    newCursor = this.managerHelper.automationCursors[Demos.Annotations.AnnCursorType.rotateCenterControlPoint];
                                else if (e.isRotateGripper)
                                    newCursor = this.managerHelper.automationCursors[Demos.Annotations.AnnCursorType.rotateGripperControlPoint];
                                else if (e.thumbIndex < 0) {
                                    if (e.dragDropEvent != null && !e.dragDropEvent.allowed)
                                        newCursor = "not-allowed";
                                    else
                                        newCursor = this.managerHelper.automationCursors[Demos.Annotations.AnnCursorType.selectedObject];
                                }
                                else {
                                    newCursor = this.managerHelper.automationCursors[Demos.Annotations.AnnCursorType.controlPoint];
                                }
                                break;
                            case lt.Annotations.Automation.AnnDesignerType.run:
                                newCursor = this.managerHelper.automationCursors[Demos.Annotations.AnnCursorType.run];
                                break;
                            default:
                                newCursor = this.managerHelper.automationCursors[Demos.Annotations.AnnCursorType.selectObject];
                                break;
                        }
                        if (imageViewer.foreCanvas.style.cursor != newCursor)
                            imageViewer.foreCanvas.style.cursor = newCursor;
                    };
                    AnnotationsDemoApp.prototype.automation_RestoreCursor = function (sender, e) {
                        var imageViewer = this._imageViewer;
                        var cursor = "default";
                        var interactiveModeCursor = null;
                        if (imageViewer.workingInteractiveMode != null) {
                            interactiveModeCursor = imageViewer.workingInteractiveMode.workingCursor;
                        }
                        else if (imageViewer.hitTestStateInteractiveMode != null) {
                            interactiveModeCursor = imageViewer.hitTestStateInteractiveMode.hitTestStateCursor;
                        }
                        else if (imageViewer.idleInteractiveMode != null) {
                            interactiveModeCursor = imageViewer.idleInteractiveMode.idleCursor;
                        }
                        if (interactiveModeCursor != null)
                            cursor = interactiveModeCursor;
                        if (imageViewer != null && imageViewer.foreCanvas.style.cursor != cursor) {
                            imageViewer.foreCanvas.style.cursor = cursor;
                        }
                    };
                    AnnotationsDemoApp.prototype.automation_SelectedObjectsChanged = function (sender, e) {
                        this.updateUIState();
                    };
                    AnnotationsDemoApp.prototype.automation_AfterObjectChanged = function (sender, e) {
                        if (e.changeType == lt.Annotations.Automation.AnnObjectChangedType.deleted) {
                            this.updateUIState();
                        }
                    };
                    AnnotationsDemoApp.prototype._initInteractiveModes = function () {
                        var _this = this;
                        this.automationInteractiveMode = new Demos.Annotations.AutomationInteractiveMode();
                        this.automationInteractiveMode.automationControl = this.automationControl;
                        this.automationInteractiveMode.idleCursor = "crosshair";
                        this.automationInteractiveMode.workingCursor = "crosshair";
                        this.rightClickInteractiveMode = new Demos.Annotations.RightClickInteractiveMode();
                        this.rightClickInteractiveMode.onRightClick = function (x, y) { return _this.rightClick_ContextMenu(x, y); };
                        this.rightClickInteractiveMode.mouseButtons = lt.Controls.MouseButtons.right;
                        this.panZoomInteractiveMode = new lt.Controls.ImageViewerPanZoomInteractiveMode();
                        this.panZoomInteractiveMode.idleCursor = "move";
                        this.panZoomInteractiveMode.workingCursor = "pointer";
                        var modes = [
                            this.automationInteractiveMode,
                            this.panZoomInteractiveMode,
                            this.rightClickInteractiveMode
                        ];
                        this._imageViewer.interactiveModes.beginUpdate();
                        for (var i = 0; i < modes.length; i++) {
                            var mode = modes[i];
                            mode.isEnabled = false;
                            this._imageViewer.interactiveModes.add(mode);
                        }
                        this.automationInteractiveMode.isEnabled = true;
                        this.rightClickInteractiveMode.isEnabled = true;
                        this._imageViewer.interactiveModes.endUpdate();
                    };
                    AnnotationsDemoApp.prototype._bindInteractiveModes = function () {
                    };
                    AnnotationsDemoApp.prototype.rightClick_ContextMenu = function (x, y) {
                        var automation = this.activeAutomation;
                        var automationControl = automation.automationControl;
                        var container = automation.container;
                        var point = lt.LeadPointD.create(x, y);
                        point = container.mapper.pointToContainerCoordinates(point);
                        var objects = container.hitTestPoint(point);
                        if (objects != null && objects.length > 0) {
                            if (automation.currentEditObject == null) {
                                var targetObject = objects[objects.length - 1];
                                automation.selectObject(targetObject);
                            }
                            automationControl.automationInvalidate(lt.LeadRectD.empty);
                            if (automation.canShowProperties) {
                                setTimeout(function () {
                                    automation.showObjectProperties();
                                }, 50);
                                this._shownDialogOnce = true;
                            }
                        }
                        else {
                            var now = Date.now();
                            if (!this._shownDialogOnce && (this._shownNotification === -1 || now - this._shownNotification > 10000)) {
                                this._shownNotification = now;
                                this._notificationGroup.notify("Right Click Available", "You can right-click on an annotations object to see settings.");
                            }
                        }
                    };
                    AnnotationsDemoApp.prototype._endOperation = function (imageChanged) {
                        this._loadingDlg.hide();
                        if (imageChanged) {
                            var fileSelect = document.getElementById("fileSelect");
                            this.activeAutomation = this.automationManager.automations.item(fileSelect.selectedIndex);
                            this.activeAutomation.active = true;
                            this.rightClickInteractiveMode.automation = this.activeAutomation;
                            this._currentImageUrl = this._tempImageUrl;
                            this._imageViewer.beginUpdate();
                            var imageDPI = this._imageDPI === 0 ? 96 : this._imageDPI;
                            var resolution = lt.LeadSizeD.create(imageDPI, imageDPI);
                            this._imageViewer.imageResolution = resolution;
                            var container = this.activeAutomation.activeContainer;
                            container.mapper.updateTransform(lt.LeadMatrix.identity);
                            container.size = container.mapper.sizeToContainerCoordinates(lt.LeadSizeD.create(this._imageViewer.activeItem.imageSize.width, this._imageViewer.activeItem.imageSize.height));
                            this._imageViewer.imageResolution = resolution;
                            this._imageViewer.useDpi = (this._imageDPI !== 0);
                            if (lt.LTHelper.device == lt.LTDevice.mobile || lt.LTHelper.device == lt.LTDevice.tablet) {
                                this._imageViewer.zoom(lt.Controls.ControlSizeMode.fitWidth, 1, this._imageViewer.defaultZoomOrigin);
                            }
                            this._imageViewer.endUpdate();
                        }
                        this._tempImageUrl = null;
                    };
                    AnnotationsDemoApp.prototype.loadAnnotationsBtn_Click = function (e) {
                        this.loadSaveHelper.automation = this.activeAutomation;
                        this.loadSaveHelper.imageViewer = this._imageViewer;
                        this.loadSaveHelper.loadAnnotations();
                    };
                    AnnotationsDemoApp.prototype.saveAnnotationsBtn_Click = function (e) {
                        this.loadSaveHelper.automation = this.activeAutomation;
                        this.loadSaveHelper.imageViewer = this._imageViewer;
                        this.loadSaveHelper.saveAnnotations();
                    };
                    AnnotationsDemoApp.prototype.loadBatesStampBtn_Click = function (e) {
                        this.loadSaveHelper.automation = this.activeAutomation;
                        this.loadSaveHelper.imageViewer = this._imageViewer;
                        this.loadSaveHelper.loadBatesStampAnnotations();
                    };
                    AnnotationsDemoApp.prototype.undoBtn_Click = function (e) {
                        if (this.activeAutomation != null && this.activeAutomation.canUndo && this.activeAutomation.manager.userMode === lt.Annotations.Core.AnnUserMode.design) {
                            this.activeAutomation.undo();
                            this.updateUIState();
                        }
                    };
                    AnnotationsDemoApp.prototype.redoBtn_Click = function (e) {
                        if (this.activeAutomation != null && this.activeAutomation.canRedo && this.activeAutomation.manager.userMode === lt.Annotations.Core.AnnUserMode.design) {
                            this.activeAutomation.redo();
                            this.updateUIState();
                        }
                    };
                    AnnotationsDemoApp.prototype.deleteAnnotationBtn_Click = function (e) {
                        if (this.activeAutomation.canDeleteObjects) {
                            this.activeAutomation.deleteSelectedObjects();
                            this.removeAutomationTextArea(false);
                        }
                    };
                    AnnotationsDemoApp.prototype.duplicateBtn_Click = function (e) {
                        var newObjects = new lt.Annotations.Core.AnnObjectCollection();
                        if (this.activeAutomation.currentEditObject instanceof lt.Annotations.Core.AnnSelectionObject) {
                            var selectionObject = this.activeAutomation.currentEditObject;
                            for (var i = 0; i < selectionObject.selectedObjects.count; i++) {
                                var x = selectionObject.selectedObjects.item(i);
                                newObjects.add(selectionObject.selectedObjects.item(i).clone());
                            }
                        }
                        else {
                            newObjects.add(this.activeAutomation.currentEditObject.clone());
                        }
                        this.activeAutomation.beginUndo();
                        for (var i = 0; i < newObjects.count; i++) {
                            this.activeAutomation.activeContainer.children.add(newObjects.item(i));
                        }
                        this.activeAutomation.endUndo();
                        this.activeAutomation.selectObjects(null);
                        this.activeAutomation.selectObjects(newObjects);
                    };
                    AnnotationsDemoApp.prototype.lockObjectBtn_Click = function (e) {
                        var _this = this;
                        if (this.activeAutomation.canLock) {
                            this.passwordDialog.setLock(true);
                            this.passwordDialog.onVerify = function () {
                                _this.activeAutomation.currentEditObject.lock(_this.passwordDialog.password);
                                _this.activeAutomation.invalidate(lt.LeadRectD.empty);
                                _this.updateUIState();
                                return true;
                            };
                            this.passwordDialog.show();
                        }
                    };
                    AnnotationsDemoApp.prototype.unlockObjectBtn_Click = function (e) {
                        var _this = this;
                        if (this.activeAutomation.canUnlock) {
                            this.passwordDialog.setLock(false);
                            this.passwordDialog.onVerify = function () {
                                _this.activeAutomation.currentEditObject.unlock(_this.passwordDialog.password);
                                var worked = !_this.activeAutomation.currentEditObject.isLocked;
                                if (!worked)
                                    window.alert("Invalid password");
                                _this.activeAutomation.invalidate(lt.LeadRectD.empty);
                                _this.updateUIState();
                                return worked;
                            };
                            this.passwordDialog.show();
                        }
                    };
                    AnnotationsDemoApp.prototype.annotationsPropertiesBtn_Click = function (e) {
                        if (this.activeAutomation.canShowProperties)
                            this.activeAutomation.showObjectProperties();
                        else {
                            this.snapToGridPropertiesDialog.automation = this.activeAutomation;
                            this.snapToGridPropertiesDialog.show();
                        }
                    };
                    AnnotationsDemoApp.prototype.objectsAlignmentOptionsBtn_Click = function (e) {
                        this.objectsAlignmentDialog.automation = this.activeAutomation;
                        this.objectsAlignmentDialog.show();
                    };
                    AnnotationsDemoApp.prototype.applyEncryptorBtn_Click = function (e) {
                        if (this.activeAutomation.canApplyEncryptor) {
                            this.activeAutomation.applyEncryptor();
                            this.activeAutomation.invalidateObject(this.activeAutomation.currentEditObject);
                        }
                        this.updateUIState();
                    };
                    AnnotationsDemoApp.prototype.applyDecryptorBtn_Click = function (e) {
                        if (this.activeAutomation.canApplyDecryptor) {
                            this.activeAutomation.applyDecryptor();
                            this.activeAutomation.invalidateObject(this.activeAutomation.currentEditObject);
                        }
                        this.updateUIState();
                    };
                    AnnotationsDemoApp.prototype.realizeRedactBtn_Click = function (e) {
                        if (this.activeAutomation.canRealizeRedaction) {
                            this.activeAutomation.realizeRedaction();
                        }
                        this.updateUIState();
                    };
                    AnnotationsDemoApp.prototype.restoreRedactBtn_Click = function (e) {
                        if (this.activeAutomation.canRestoreRedaction) {
                            this.activeAutomation.restoreRedaction();
                        }
                        this.updateUIState();
                    };
                    AnnotationsDemoApp.prototype.burnAnnotationsBtn_Click = function (e) {
                        var imageCanvas = this._imageViewer.activeItem.canvas;
                        var context = imageCanvas.getContext('2d');
                        var renderingEngine = new lt.Annotations.Rendering.AnnHtml5RenderingEngine();
                        renderingEngine.resources = this.automationManager.resources;
                        renderingEngine.renderers = this.renderingEngine.renderers;
                        renderingEngine.attach(this.activeAutomation.container, context);
                        if (renderingEngine != null) {
                            var imageRes = this._imageViewer.imageResolution;
                            renderingEngine.burnToRectWithDpi(lt.LeadRectD.empty, imageRes.width, imageRes.height, imageRes.width, imageRes.height);
                        }
                        this.automationControl.automationInvalidate(lt.LeadRectD.empty);
                    };
                    AnnotationsDemoApp.prototype.runUserModeBtn_Click = function (e) {
                        if (this.activeAutomation) {
                            this.activeAutomation.manager.userMode = lt.Annotations.Core.AnnUserMode.run;
                        }
                        this.updateUIState();
                    };
                    AnnotationsDemoApp.prototype.designUserModeBtn_Click = function (e) {
                        if (this.activeAutomation) {
                            this.activeAutomation.manager.userMode = lt.Annotations.Core.AnnUserMode.design;
                        }
                        this.updateUIState();
                    };
                    AnnotationsDemoApp.prototype.documentAnnotationsBtn_BtnClicked = function (e) {
                        this.documentPackDialog.show();
                    };
                    AnnotationsDemoApp.prototype.medicalAnnotationsBtn_BtnClicked = function (e) {
                        this.medicalPackDialog.show();
                    };
                    AnnotationsDemoApp.prototype.richTextDialog_Hide = function () {
                        this.isDialogOpen = false;
                        var automation = this.activeAutomation;
                        if (automation == null)
                            return;
                        var richTextObject = this.activeAutomation.get_currentEditObject();
                        if (richTextObject) {
                            richTextObject.richTextString = $(this.richTextDialog.richTextEditor).closest(".jqte").find(".jqte_editor").html();
                            richTextObject.isSvgTextValid = false;
                            richTextObject.image.onload = function () {
                                automation.invalidate(lt.LeadRectD.empty);
                                richTextObject.image.onload = null;
                            };
                            richTextObject.loadSvgImage();
                        }
                    };
                    AnnotationsDemoApp.prototype.updateUIState = function () {
                        if (this.activeAutomation == null)
                            return;
                        var userMode = this.activeAutomation.manager.userMode;
                        if (userMode == lt.Annotations.Core.AnnUserMode.run) {
                            $(this._commonUI.openBtn).prop("disabled", true);
                            $(this._commonUI.saveImageBtn).prop("disabled", true);
                            $(this._demoUI.loadAnnotationsBtn).prop("disabled", true);
                            $(this._demoUI.saveAnnotationsBtn).prop("disabled", true);
                            $(this._demoUI.loadBatesStampBtn).prop("disabled", true);
                            $(this._demoUI.undoBtn).prop("disabled", true);
                            $(this._demoUI.redoBtn).prop("disabled", true);
                            $(this._demoUI.deleteAnnotationBtn).prop("disabled", true);
                            $(this._demoUI.lockObjectBtn).prop("disabled", true);
                            $(this._demoUI.unlockObjectBtn).prop("disabled", true);
                            $(this._demoUI.applyEncryptorBtn).prop("disabled", true);
                            $(this._demoUI.applyDecryptorBtn).prop("disabled", true);
                            $(this._demoUI.realizeRedactBtn).prop("disabled", true);
                            $(this._demoUI.restoreRedactBtn).prop("disabled", true);
                            $(this._demoUI.annotationsPropertiesBtn).prop("disabled", true);
                            $(this._demoUI.burnAnnotationsBtn).prop("disabled", true);
                            $(this._demoUI.runUserModeBtn).prop("disabled", true);
                            $(this._demoUI.duplicateBtn).prop("disabled", true);
                            $(this._demoUI.objectsAlignmentOptionsBtn).prop("disabled", true);
                            $(this._demoUI.annotationObjectsBtns).prop("disabled", true);
                            $(this._commonUI.interactiveModesBtns).prop("disabled", true);
                            $(this._demoUI.documentAnnotationsBtn).prop("disabled", true);
                            $(this._demoUI.medicalAnnotationsBtn).prop("disabled", true);
                            $(this._demoUI.designUserModeBtn).prop("disabled", false);
                        }
                        if (userMode == lt.Annotations.Core.AnnUserMode.design) {
                            $(this._commonUI.openBtn).prop("disabled", false);
                            $(this._commonUI.saveImageBtn).prop("disabled", false);
                            $(this._demoUI.loadAnnotationsBtn).prop("disabled", false);
                            $(this._demoUI.saveAnnotationsBtn).prop("disabled", false);
                            $(this._demoUI.loadBatesStampBtn).prop("disabled", false);
                            $(this._demoUI.undoBtn).prop("disabled", !this.activeAutomation.canUndo);
                            $(this._demoUI.redoBtn).prop("disabled", !this.activeAutomation.canRedo);
                            $(this._demoUI.deleteAnnotationBtn).prop("disabled", !this.activeAutomation.canDeleteObjects);
                            $(this._demoUI.lockObjectBtn).prop("disabled", !this.activeAutomation.canLock);
                            $(this._demoUI.unlockObjectBtn).prop("disabled", !this.activeAutomation.canUnlock);
                            $(this._demoUI.applyEncryptorBtn).prop("disabled", !this.activeAutomation.canApplyEncryptor);
                            $(this._demoUI.applyDecryptorBtn).prop("disabled", !this.activeAutomation.canApplyDecryptor);
                            $(this._demoUI.realizeRedactBtn).prop("disabled", !this.activeAutomation.canRealizeRedaction);
                            $(this._demoUI.restoreRedactBtn).prop("disabled", !this.activeAutomation.canRestoreRedaction);
                            $(this._demoUI.objectsAlignmentOptionsBtn).prop("disabled", false);
                            $(this._demoUI.annotationsPropertiesBtn).prop("disabled", false);
                            $(this._demoUI.duplicateBtn).prop("disabled", !this.activeAutomation.currentEditObject);
                            $(this._demoUI.burnAnnotationsBtn).prop("disabled", this.activeAutomation.activeContainer.children.count == 0);
                            $(this._demoUI.runUserModeBtn).prop("disabled", false);
                            $(this._demoUI.designUserModeBtn).prop("disabled", true);
                            $(this._demoUI.annotationObjectsBtns).prop("disabled", false);
                            $(this._commonUI.interactiveModesBtns).prop("disabled", false);
                            $(this._demoUI.documentAnnotationsBtn).prop("disabled", false);
                            $(this._demoUI.medicalAnnotationsBtn).prop("disabled", false);
                        }
                    };
                    AnnotationsDemoApp.prototype.annotationsObjectsBtns_BtnClicked = function (e) {
                        var objectIndex = parseInt($(e.currentTarget).val());
                        this.setCurrentObjectId(objectIndex);
                    };
                    AnnotationsDemoApp.prototype.setCurrentObjectId = function (id) {
                        this._imageViewer.interactiveModes.beginUpdate();
                        for (var i = 0; i < this._imageViewer.interactiveModes.count; i++) {
                            this._imageViewer.interactiveModes.item(i).isEnabled = false;
                        }
                        if (id == 0) {
                            this.panZoomInteractiveMode.isEnabled = true;
                        }
                        else {
                            this.automationInteractiveMode.isEnabled = true;
                            this.rightClickInteractiveMode.isEnabled = true;
                            this.automationManager.currentObjectId = id;
                        }
                        this._imageViewer.interactiveModes.endUpdate();
                        this.updateAnnotationsObjectsBtnsCheckedState();
                    };
                    AnnotationsDemoApp.prototype.updateAnnotationsObjectsBtnsCheckedState = function () {
                        var manager = this.automationManager;
                        if (!manager)
                            return;
                        var currentObjectId = manager.currentObjectId;
                        var $objects = $(this._demoUI.annotationObjectsBtns);
                        var panZoomEnabled = this.panZoomInteractiveMode.isEnabled;
                        if (panZoomEnabled) {
                            var $object = $(this._commonUI.panZoomBtn);
                        }
                        else {
                            if (currentObjectId === lt.Annotations.Core.AnnObject.none)
                                currentObjectId = lt.Annotations.Core.AnnObject.selectObjectId;
                            var $object = $objects.filter("[value=" + currentObjectId + "]").first();
                        }
                        if ($object.length) {
                            var isChecked = Demos.Utils.UI.isChecked($object);
                            if (!isChecked) {
                                Demos.Utils.UI.toggleChecked($objects, false);
                                Demos.Utils.UI.toggleChecked($object, true);
                            }
                        }
                        else {
                            Demos.Utils.UI.toggleChecked($objects, false);
                        }
                    };
                    AnnotationsDemoApp.prototype.showAutomationUpdateObjectDialog = function (showProperties, showReviews, showContent, targetObject) {
                        var isSelectionObject = targetObject instanceof lt.Annotations.Core.AnnSelectionObject;
                        if (!targetObject.supportsContent || isSelectionObject)
                            showContent = false;
                        if (isSelectionObject)
                            showReviews = false;
                        this.automationUpdateObjectDialog.showProperties = showProperties;
                        this.automationUpdateObjectDialog.showContent = showContent;
                        this.automationUpdateObjectDialog.showReviews = showReviews;
                        this.automationUpdateObjectDialog.automation = this.activeAutomation;
                        this.automationUpdateObjectDialog.targetObject = targetObject;
                        this.isDialogOpen = true;
                        this.automationUpdateObjectDialog.show();
                    };
                    return AnnotationsDemoApp;
                }(Basic.CommonApp));
                AnnotationsDemo.AnnotationsDemoApp = AnnotationsDemoApp;
            })(AnnotationsDemo = Basic.AnnotationsDemo || (Basic.AnnotationsDemo = {}));
        })(Basic = Demos.Basic || (Demos.Basic = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
document.addEventListener("DOMContentLoaded", function () {
    (new lt.Demos.Basic.AnnotationsDemo.AnnotationsDemoApp()).run();
});
