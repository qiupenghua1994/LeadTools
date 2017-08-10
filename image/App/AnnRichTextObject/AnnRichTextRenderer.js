var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Basic;
        (function (Basic) {
            var AnnotationsDemo;
            (function (AnnotationsDemo) {
                var AnnRichTextRenderer = (function (_super) {
                    __extends(AnnRichTextRenderer, _super);
                    function AnnRichTextRenderer() {
                        _super.call(this);
                    }
                    AnnRichTextRenderer.prototype.render = function (mapper, annObject) {
                        _super.prototype.render.call(this, mapper, annObject);
                        var engine = _super.prototype.get_renderingEngine.call(this);
                        if (engine) {
                            var context = engine.context;
                            if (context) {
                                context.save();
                                var richTextObject = annObject;
                                var defaultMapper = lt.Annotations.Core.AnnContainerMapper.createDefault();
                                var defaultRect = defaultMapper.rectFromContainerCoordinates(richTextObject.rect, annObject.fixedStateOperations);
                                var transformedRect = mapper.rectFromContainerCoordinates(richTextObject.rect, annObject.fixedStateOperations);
                                var scaleX = defaultRect.width / transformedRect.width;
                                var scaleY = defaultRect.height / transformedRect.height;
                                transformedRect.inflate(-annObject.stroke.strokeThickness.value / 2, -annObject.stroke.strokeThickness.value / 2);
                                if (transformedRect.width < 1)
                                    transformedRect.width = 1;
                                if (transformedRect.height < 1)
                                    transformedRect.height = 1;
                                if (richTextObject.isImageLoaded) {
                                    context.drawImage(richTextObject.image, 0, 0, transformedRect.width * scaleX, transformedRect.height * scaleY, transformedRect.x, transformedRect.y, transformedRect.width, transformedRect.height);
                                }
                                else {
                                    var svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="10000" height="10000">';
                                    svgString += richTextObject.richTextSvgString;
                                    svgString += '</svg>';
                                    richTextObject.image = document.createElement("img");
                                    richTextObject.image.onload = function () {
                                        richTextObject.isImageLoaded = true;
                                        context.drawImage(richTextObject.image, 0, 0, transformedRect.width * scaleX, transformedRect.height * scaleY, transformedRect.x, transformedRect.y, transformedRect.width, transformedRect.height);
                                        richTextObject.image.onload = null;
                                    };
                                    richTextObject.isImageLoaded = false;
                                    if (lt.LTHelper.browser === lt.LTBrowser.internetExplorer && lt.LTHelper.version <= 9) {
                                        var svgStringBytes = [];
                                        for (var i = 0; i < svgString.length; ++i) {
                                            svgStringBytes.push(svgString.charCodeAt(i));
                                        }
                                        richTextObject.image.src = "data:image/svg+xml;base64," + lt.Annotations.Core.Utils.toBase64String(svgStringBytes);
                                    }
                                    else {
                                        richTextObject.image.src = "data:image/svg+xml;base64," + btoa(svgString);
                                    }
                                }
                                context.restore();
                            }
                        }
                    };
                    AnnRichTextRenderer.prototype.renderNote = function (mapper, annObject, operations) { return; };
                    AnnRichTextRenderer.prototype.renderSelection = function (mapper, annObject) { return; };
                    return AnnRichTextRenderer;
                }(lt.Annotations.Rendering.AnnRectangleObjectRenderer));
                AnnotationsDemo.AnnRichTextRenderer = AnnRichTextRenderer;
            })(AnnotationsDemo = Basic.AnnotationsDemo || (Basic.AnnotationsDemo = {}));
        })(Basic = Demos.Basic || (Demos.Basic = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
