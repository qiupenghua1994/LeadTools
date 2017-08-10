var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Basic;
        (function (Basic) {
            var AnnotationsDemo;
            (function (AnnotationsDemo) {
                var AnnotationLoadSaveHelper = (function () {
                    function AnnotationLoadSaveHelper() {
                        this._automation = null;
                        this._imageViewer = null;
                        this.fileInput = document.createElement("div");
                        this.fileInput.style.display = "none";
                        $(this.fileInput).append('<input type="file" id="inputFileBrowser" accept="text/xml" value="Load" />');
                        document.body.appendChild(this.fileInput);
                    }
                    Object.defineProperty(AnnotationLoadSaveHelper.prototype, "automation", {
                        set: function (value) {
                            this._automation = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(AnnotationLoadSaveHelper.prototype, "imageViewer", {
                        set: function (value) {
                            this._imageViewer = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    AnnotationLoadSaveHelper.prototype.onInputFileChange = function (isBatesStamp) {
                        var _this = this;
                        var fileBrowser = document.getElementById('inputFileBrowser');
                        if (lt.LTHelper.supportsFileReader) {
                            var file = fileBrowser.files[0];
                            if (file != null) {
                                var reader = new FileReader();
                                reader.onload = function () {
                                    var content = reader.result;
                                    reader.onload = null;
                                    _this.loadContent(content, 1, isBatesStamp);
                                };
                                reader.readAsText(file, 'UTF-8');
                            }
                        }
                        else {
                            alert('Your browser does not support HTML 5 FileReader API. Loading annotations is disabled.');
                        }
                    };
                    AnnotationLoadSaveHelper.prototype.loadContent = function (content, pageNumber, isBatesStamp) {
                        if (!isBatesStamp) {
                            try {
                                var codecs = new lt.Annotations.Core.AnnCodecs();
                                var container = codecs.load(content, pageNumber);
                                var srcChildren = container.children;
                                if (srcChildren.count > 0) {
                                    var destChildren = this._automation.container.children;
                                    destChildren.clear();
                                    var selectionObject = this._automation.container.selectionObject;
                                    if (selectionObject != null && selectionObject.selectedObjects.count > 0) {
                                        selectionObject.selectedObjects.clear();
                                        selectionObject.isSelected = false;
                                    }
                                    var scale = this._imageViewer.scaleFactor;
                                    var point = lt.LeadPointD.create(0, 0);
                                    for (var i = 0; i < srcChildren.count; i++) {
                                        var child = srcChildren.item(i);
                                        destChildren.add(child);
                                    }
                                }
                                for (var i = 0; i < container.layers.count; i++) {
                                    this._automation.container.layers.add(container.layers.item(i));
                                }
                                this._automation.automationControl.automationInvalidate(lt.LeadRectD.empty);
                            }
                            catch (exception) {
                                alert('File does not contain valid LEADTOOLS annotation data.');
                            }
                        }
                        else {
                            try {
                                var compserEngine = new lt.Annotations.Rendering.AnnHtml5RenderingEngine();
                                lt.Annotations.Documents.AnnBatesStampComposer.renderingEngine = compserEngine;
                                var batesStampComposer = lt.Annotations.Documents.AnnBatesStampComposer.load(content);
                                var automation = this._automation;
                                var mainContainer = automation.container;
                                if (automation.containers.count == 2)
                                    automation.containers.removeAt(0);
                                var batesStampContainer = new lt.Annotations.Core.AnnContainer();
                                batesStampContainer.size = mainContainer.size;
                                batesStampContainer.mapper = mainContainer.mapper.clone();
                                batesStampComposer.targetContainers.add(batesStampContainer);
                                this._automation.containers.insertItem(0, batesStampContainer);
                                this._automation.invalidate(lt.LeadRectD.empty);
                            }
                            catch (exception) {
                                alert('File does not contain valid LEADTOOLS Bates Stamp data.');
                            }
                        }
                    };
                    AnnotationLoadSaveHelper.prototype.saveXml = function (xml, ext) {
                        var _this = this;
                        var rest = [Basic.ServiceHelper.serviceUri, "Data", "SaveXml"].join("/");
                        $.ajax(rest, {
                            'type': "POST",
                            contentType: "text/xml",
                            data: xml
                        }).done(function (fileUrl) {
                            if (!!fileUrl) {
                                _this.downloadFile(fileUrl, ext);
                            }
                            else {
                                alert('Error saving the file');
                            }
                        })
                            .fail(function (xhr, statusText, errorThrown) { return _this.showRequestError(xhr, statusText, errorThrown); });
                    };
                    AnnotationLoadSaveHelper.prototype.showRequestError = function (jqueryXHR, statusText, errorThrown) {
                        var body = null;
                        var detail = null;
                        try {
                            body = JSON.parse(jqueryXHR.responseText);
                            detail = "(" + body["detail"] + ")";
                            lt.LTHelper.logError("Error: " + detail);
                        }
                        catch (e) {
                            lt.LTHelper.logError("Could not parse JSON from Error");
                            detail = "(Error " + jqueryXHR.status + ": " + jqueryXHR.statusText + ")";
                        }
                        var message = [
                            "An error has occurred in the application.",
                            detail
                        ].join("\n");
                        window.alert(message);
                        jqueryXHR = null;
                    };
                    AnnotationLoadSaveHelper.prototype.downloadFile = function (url, ext) {
                        var _this = this;
                        var rest = [Basic.ServiceHelper.serviceUri, "Data", "Download"].join("/");
                        var params = {
                            uri: encodeURIComponent(url),
                            name: "Annotations." + ext,
                            mimeType: "text/xml"
                        };
                        rest = Basic.ServiceHelper.addParamsToUrl(rest, params);
                        $.ajax(rest, {
                            "type": "GET",
                            headers: { "cache-control": "no-cache" }
                        }).done(function () {
                            var oWin = null;
                            if (lt.LTHelper.browser == lt.LTBrowser.internetExplorer) {
                                oWin = window.open("");
                                oWin.navigate(rest);
                            }
                            else {
                                oWin = window.open(rest);
                            }
                            if (oWin == null || typeof (oWin) == 'undefined') {
                                alert('Your Popup Blocker has blocked saving the annotation file to your disk. Disable the Popup Blocker for this web site and try again.');
                            }
                        })
                            .fail(function (xhr, statusText, errorThrown) { return _this.showRequestError(xhr, statusText, errorThrown); });
                    };
                    AnnotationLoadSaveHelper.prototype.loadAnnotations = function () {
                        var _this = this;
                        if (this._automation == null || this._imageViewer == null) {
                            alert("ImageViewer does not exist.");
                            return;
                        }
                        $('#inputFileBrowser').remove();
                        $(this.fileInput).append('<input type="file" id="inputFileBrowser" accept="text/xml" value="Load" change="onInputFileChange()"/>');
                        $("#inputFileBrowser").bind('change', function () { return _this.onInputFileChange(false); });
                        if (lt.LTHelper.OS == lt.LTOS.android && lt.LTHelper.browser != lt.LTBrowser.opera) {
                            $("#inputFileBrowser").click();
                        }
                        else {
                            window.setTimeout(function () {
                                $("#inputFileBrowser").click();
                            }, 200);
                        }
                    };
                    AnnotationLoadSaveHelper.prototype.saveAnnotations = function () {
                        if (this._automation == null || this._imageViewer == null) {
                            alert("ImageViewer does not exist.");
                            return;
                        }
                        var codecs = new lt.Annotations.Core.AnnCodecs();
                        var xmlString = codecs.save(this._automation.container, lt.Annotations.Core.AnnFormat.annotations, null, 1);
                        this.saveXml(xmlString, 'xml');
                    };
                    AnnotationLoadSaveHelper.prototype.loadBatesStampAnnotations = function () {
                        var _this = this;
                        if (this._automation == null || this._imageViewer == null) {
                            alert("ImageViewer does not exist.");
                            return;
                        }
                        $('#inputFileBrowser').remove();
                        $(this.fileInput).append('<input type="file" id="inputFileBrowser" accept="text/xml" value="Load" />');
                        $("#inputFileBrowser").bind('change', function () { return _this.onInputFileChange(true); });
                        if (lt.LTHelper.OS == lt.LTOS.android && lt.LTHelper.browser != lt.LTBrowser.opera) {
                            $("#inputFileBrowser").click();
                        }
                        else {
                            window.setTimeout(function () {
                                $("#inputFileBrowser").click();
                            }, 200);
                        }
                    };
                    return AnnotationLoadSaveHelper;
                }());
                AnnotationsDemo.AnnotationLoadSaveHelper = AnnotationLoadSaveHelper;
            })(AnnotationsDemo = Basic.AnnotationsDemo || (Basic.AnnotationsDemo = {}));
        })(Basic = Demos.Basic || (Demos.Basic = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
