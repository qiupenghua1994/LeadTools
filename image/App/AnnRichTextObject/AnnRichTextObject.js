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
                var AnnRichTextObject = (function (_super) {
                    __extends(AnnRichTextObject, _super);
                    function AnnRichTextObject() {
                        _super.call(this);
                        this.image = document.createElement("img");
                        this.richTextString = '<p><span style="color: rgb(255, 0, 0);"></span><span style="color: rgb(0, 0, 0); font-size: 20px;"><span style="color: rgb(255, 0, 0); font-size: 20px;">Aa</span><span style="color: rgb(0, 255, 0); font-size: 20px;">Bb</span><span style="color: rgb(0, 0, 255); font-size: 20px;">Yy</span><span style="color: rgb(0, 0, 0); font-size: 20px;">Zz</span></span><span style="color: rgb(0, 0, 0); font-size: 14px;"></span></p>';
                        this.richTextSvgString = '';
                        this.isSvgTextValid = false;
                        this.loadSvgImage();
                        this.setId(-200);
                        this.tag = null;
                        AnnRichTextObject.registerClass('lt.Demos.Basic.AnnotationsDemo.AnnRichTextObject', lt.Annotations.Core.AnnObject);
                    }
                    AnnRichTextObject.prototype.create = function () {
                        return new AnnRichTextObject();
                    };
                    Object.defineProperty(AnnRichTextObject.prototype, "friendlyName", {
                        get: function () { return 'Rich Text'; },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(AnnRichTextObject.prototype, "supportsFill", {
                        get: function () { return true; },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(AnnRichTextObject.prototype, "supportsFont", {
                        get: function () { return false; },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(AnnRichTextObject.prototype, "canRotate", {
                        get: function () { return false; },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(AnnRichTextObject.prototype, "supportsContent", {
                        get: function () { return false; },
                        enumerable: true,
                        configurable: true
                    });
                    AnnRichTextObject.prototype.validateSvgString = function () {
                        this.richTextSvgString = this.convertSvgNode(this.richTextString);
                        this.isSvgTextValid = true;
                    };
                    AnnRichTextObject.prototype.convertSvgNode = function (htmlInput) {
                        var svgElements = "";
                        if (htmlInput) {
                            while (htmlInput.search("rgba") > 0) {
                                htmlInput = htmlInput.replace("rgba", "rgb");
                            }
                            while (htmlInput.search("&nbsp;") >= 0) {
                                htmlInput = htmlInput.replace("&nbsp;", " ");
                            }
                            while (htmlInput.search("div") > 0) {
                                htmlInput = htmlInput.replace("div", "p");
                            }
                            var startIndex = -1;
                            var endIndex = -1;
                            var lineCloseTag = "</p>";
                            var line;
                            var textElementsValues = [];
                            var textElementsXPositions = [];
                            var textElementsYPositions = [];
                            var textElementsFill = [];
                            var textElementsIsBold = [];
                            var textElementsIsItalic = [];
                            var textElementsIsStrike = [];
                            var textElementsIsUnderline = [];
                            var textElementsFontSizes = [];
                            var textElementsFontTypes = [];
                            var rectsHeights = [];
                            var rectsWidths = [];
                            var rectsXPositions = [];
                            var rectsYPositions = [];
                            var rectsFill = [];
                            var lines = [];
                            var isValid = false;
                            while (true) {
                                var openTag1 = htmlInput.search("<p>");
                                var openTag2 = htmlInput.search("<p ");
                                if (openTag1 == -1 && openTag2 >= 0)
                                    startIndex = openTag2;
                                else if (openTag2 == -1 && openTag1 >= 0)
                                    startIndex = openTag1;
                                else if (openTag1 >= 0 && openTag2 >= 0)
                                    startIndex = Math.min(openTag1, openTag2);
                                else if (!isValid) {
                                    htmlInput = '<p>' + htmlInput + '</p>';
                                    isValid = true;
                                    continue;
                                }
                                else {
                                    break;
                                }
                                endIndex = htmlInput.search("</p>");
                                line = htmlInput.substring(startIndex, htmlInput.search("</p>") + ("</p>").length);
                                htmlInput = htmlInput.substring(startIndex + line.length, htmlInput.length);
                                lines.push(line);
                            }
                            var lineNumber = -1;
                            var currentLineFirstIndex;
                            var currentLineRectFirstIndex;
                            for (var i = 0; i < lines.length; i++) {
                                line = lines[i];
                                currentLineFirstIndex = textElementsValues.length;
                                currentLineRectFirstIndex = rectsFill.length;
                                var lineIsEmpty = true;
                                var isbold = 0;
                                var isItalic = 0;
                                var isUnderlined = 0;
                                var isStrike = 0;
                                var textColors = [];
                                var backgroundColors = [];
                                var fontTypes = [];
                                var xPosition = 0;
                                var fontSizes = [];
                                var biggestFontSize = 0;
                                startIndex = -1;
                                endIndex = -1;
                                while (true) {
                                    startIndex = line.search('<');
                                    endIndex = line.search('>');
                                    if (startIndex == 0) {
                                        if (line.search("<span ") == 0 || line.search("<span>") == 0) {
                                            var colorKey = '';
                                            if ((line.search('"color') < endIndex && line.search('"color') > 0))
                                                colorKey = '"color';
                                            else if ((line.search(' color') < endIndex && line.search(' color') > 0))
                                                colorKey = ' color';
                                            else if ((line.search(';color') < endIndex && line.search(';color') > 0))
                                                colorKey = ';color';
                                            else if ((line.search("'color") < endIndex && line.search("'color") > 0))
                                                colorKey = "'color";
                                            if (colorKey != '') {
                                                var colorValue = '';
                                                colorValue = line.substring(line.search(colorKey), line.length);
                                                colorValue = colorValue.substring(colorKey.length + 1, colorValue.indexOf(')') + 1);
                                                while (colorValue[0] == ' ') {
                                                    colorValue = colorValue.slice(1, colorValue.length);
                                                }
                                                if (colorValue.search("rgb") == 0) {
                                                    textColors.push(colorValue);
                                                }
                                            }
                                            else {
                                                textColors.push('rgb (0, 0, 0)');
                                            }
                                            if (line.search('background-color') < endIndex && line.search('background-color') > 0) {
                                                var colorValue = '';
                                                colorValue = line.substring(line.search("background-color:"), line.length);
                                                colorValue = colorValue.substring("background-color:".length, colorValue.indexOf(')') + 1);
                                                while (colorValue[0] == ' ') {
                                                    colorValue = colorValue.slice(1, colorValue.length);
                                                }
                                                if (colorValue.search("rgb") == 0 && colorValue.search("254") < 0) {
                                                    backgroundColors.push(colorValue);
                                                }
                                                else {
                                                    backgroundColors.push("Transparent");
                                                }
                                            }
                                            else {
                                                backgroundColors.push("Transparent");
                                            }
                                            if (line.search('font-size') < endIndex && line.search('font-size') > 0) {
                                                var fontSizeValue = '';
                                                fontSizeValue = line.substring(line.search("font-size:"), line.length);
                                                fontSizeValue = fontSizeValue.substring("font-size:".length, fontSizeValue.indexOf('px'));
                                                while (fontSizeValue[0] == ' ') {
                                                    fontSizeValue = fontSizeValue.slice(1, fontSizeValue.length);
                                                }
                                                fontSizes.push(fontSizeValue);
                                            }
                                            else {
                                                fontSizes.push('14');
                                            }
                                            if (line.search('font-family') < endIndex && line.search('font-family') > 0) {
                                                var fontTypeValue = '';
                                                fontTypeValue = line.substring(line.search("font-family:"), line.length);
                                                fontTypeValue = fontTypeValue.substring("font-family:".length, fontTypeValue.indexOf(';'));
                                                while (fontTypeValue[0] == ' ' || fontTypeValue[0] == "'" || fontTypeValue[0] == '"' || fontTypeValue[0] == "\\") {
                                                    fontTypeValue = fontTypeValue.slice(1, fontTypeValue.length);
                                                }
                                                while (fontTypeValue[fontTypeValue.length - 1] == ' ' || fontTypeValue[fontTypeValue.length - 1] == "'" || fontTypeValue[fontTypeValue.length - 1] == '"' || fontTypeValue[fontTypeValue.length - 1] == "\\") {
                                                    fontTypeValue = fontTypeValue.slice(0, fontTypeValue.length - 1);
                                                }
                                                if (fontTypeValue == "Arial" || fontTypeValue == "Courier New" || fontTypeValue == "Times New Roman" || fontTypeValue == "Verdana") {
                                                    fontTypes.push(fontTypeValue);
                                                }
                                                else {
                                                    fontTypes.push("Arial");
                                                }
                                            }
                                            else {
                                                fontTypes.push("Arial");
                                            }
                                        }
                                        else if (line.search("<strong ") == 0 || line.search("<strong>") == 0 || line.search("<b ") == 0 || line.search("<b>") == 0) {
                                            isbold++;
                                        }
                                        else if (line.search("<br>") == 0 || line.search("<br ") == 0) {
                                            lineNumber++;
                                        }
                                        else if (line.search("<em ") == 0 || line.search("<em>") == 0 || line.search("<i ") == 0 || line.search("<i>") == 0) {
                                            isItalic++;
                                        }
                                        else if (line.search("<strike ") == 0 || line.search("<strike>") == 0) {
                                            isStrike++;
                                        }
                                        else if (line.search("<u ") == 0 || line.search("<u>") == 0) {
                                            isUnderlined++;
                                        }
                                        else if (line.search("</strong ") == 0 || line.search("</strong>") == 0 || line.search("</b ") == 0 || line.search("</b>") == 0) {
                                            isbold--;
                                        }
                                        else if (line.search("</em ") == 0 || line.search("</em>") == 0 || line.search("</i ") == 0 || line.search("</i>") == 0) {
                                            isItalic--;
                                        }
                                        else if (line.search("</strike ") == 0 || line.search("</strike>") == 0) {
                                            isStrike--;
                                        }
                                        else if (line.search("</u ") == 0 || line.search("</u>") == 0) {
                                            isUnderlined--;
                                        }
                                        else if (line.search("</span ") == 0 || line.search("</span>") == 0) {
                                            if (textColors.length > 0)
                                                textColors.pop();
                                            if (backgroundColors.length > 0) {
                                                backgroundColors.pop();
                                            }
                                            if (fontTypes.length > 0) {
                                                fontTypes.pop();
                                            }
                                            if (fontSizes.length > 0) {
                                                fontSizes.pop();
                                            }
                                        }
                                        line = line.substring(endIndex + 1, line.length);
                                    }
                                    else if (startIndex > 0) {
                                        var value = line.substring(0, startIndex);
                                        var fontType = '';
                                        if (fontTypes.length > 0) {
                                            fontType = fontTypes[fontTypes.length - 1];
                                        }
                                        else {
                                            fontType = "Arial";
                                        }
                                        var fontSize = '';
                                        if (fontSizes.length > 0) {
                                            fontSize = (fontSizes[fontSizes.length - 1]);
                                        }
                                        else {
                                            fontSize = "14";
                                        }
                                        if (parseInt(fontSize) > biggestFontSize)
                                            biggestFontSize = parseInt(fontSize);
                                        if (lineIsEmpty) {
                                            lineIsEmpty = false;
                                            lineNumber++;
                                        }
                                        textElementsFontSizes.push(fontSize);
                                        textElementsXPositions.push(xPosition.toString());
                                        if (textColors.length > 0) {
                                            textElementsFill.push(textColors[textColors.length - 1]);
                                        }
                                        else {
                                            textElementsFill.push('rgb (0, 0, 0)');
                                        }
                                        if (backgroundColors.length > 0) {
                                            if (backgroundColors[backgroundColors.length - 1] != "Transparent") {
                                                rectsXPositions.push(xPosition.toString());
                                                rectsWidths.push((this.getTextWidth(value, fontType, fontSize, isbold, isItalic)).toString());
                                                rectsFill.push(backgroundColors[backgroundColors.length - 1]);
                                            }
                                        }
                                        textElementsFontTypes.push(fontType);
                                        textElementsIsBold.push(isbold.toString());
                                        textElementsIsItalic.push(isItalic.toString());
                                        textElementsIsStrike.push(isStrike.toString());
                                        textElementsIsUnderline.push(isUnderlined.toString());
                                        textElementsValues.push(value);
                                        xPosition += this.getTextWidth(value, fontType, fontSize, isbold, isItalic);
                                        line = line.substring(startIndex, line.length);
                                    }
                                    else {
                                        var shift = 5;
                                        if (textElementsYPositions.length != 0) {
                                            shift += parseInt(textElementsYPositions[textElementsYPositions.length - 1]);
                                        }
                                        for (var index = currentLineFirstIndex; index < textElementsValues.length; index++) {
                                            textElementsYPositions.push((biggestFontSize + shift).toString());
                                        }
                                        for (var index = currentLineRectFirstIndex; index < rectsFill.length; index++) {
                                            rectsYPositions.push((shift + biggestFontSize * 25 / 100).toString());
                                        }
                                        for (var index = currentLineRectFirstIndex; index < rectsFill.length; index++) {
                                            rectsHeights.push((biggestFontSize).toString());
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        var textElements = "";
                        if (textElementsValues != null) {
                            for (var i = 0; i < textElementsValues.length; i++) {
                                var textElement = '<text xml:space="preserve" font-size="' + textElementsFontSizes[i] + '" x ="' + textElementsXPositions[i] + '" y = "' + textElementsYPositions[i] + '" fill = "' + textElementsFill[i] + '" style = "font-family: ' + textElementsFontTypes[i] + '; ';
                                if (parseInt(textElementsIsBold[i]) > 0) {
                                    textElement += 'font-weight: bold; ';
                                }
                                if (parseInt(textElementsIsItalic[i]) > 0) {
                                    textElement += 'font-style: italic; ';
                                }
                                if (parseInt(textElementsIsStrike[i]) > 0) {
                                    textElement += 'text-decoration: line-through; ';
                                }
                                if (parseInt(textElementsIsUnderline[i]) > 0) {
                                    textElement += 'text-decoration: underline; ';
                                }
                                while (textElementsValues[i].search(" ") >= 0) {
                                    textElementsValues[i] = textElementsValues[i].replace(" ", "&#160;");
                                }
                                textElement += '">' + textElementsValues[i] + '</text>';
                                textElements += textElement;
                            }
                        }
                        var svgRects = "";
                        if (rectsFill != null) {
                            for (var i = 0; i < rectsFill.length; i++) {
                                var rect = '<rect x ="' + rectsXPositions[i] + '" y ="' + rectsYPositions[i] + '" width ="' + rectsWidths[i] + '" height ="' + rectsHeights[i] + '" fill ="' + rectsFill[i] + '"></rect>';
                                svgRects += rect;
                            }
                        }
                        return svgRects + textElements;
                    };
                    AnnRichTextObject.prototype.loadSvgImage = function () {
                        var richTextObject = this;
                        if (!richTextObject.isSvgTextValid) {
                            richTextObject.validateSvgString();
                        }
                        var svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="10000" height="10000">';
                        svgString += richTextObject.richTextSvgString;
                        svgString += '</svg>';
                        var oldOnLoadHandler = richTextObject.image.onload;
                        richTextObject.image.onload = function () {
                            richTextObject.isImageLoaded = true;
                            if (oldOnLoadHandler != null)
                                oldOnLoadHandler.apply(richTextObject);
                        };
                        richTextObject.isImageLoaded = false;
                        if (lt.LTHelper.browser == lt.LTBrowser.internetExplorer && lt.LTHelper.version <= 9) {
                            var svgStringBytes = [];
                            for (var i = 0; i < svgString.length; ++i) {
                                svgStringBytes.push(svgString.charCodeAt(i));
                            }
                            richTextObject.image.src = "data:image/svg+xml;base64," + lt.Annotations.Core.Utils.toBase64String(svgStringBytes);
                        }
                        else {
                            richTextObject.image.src = "data:image/svg+xml;base64," + btoa(svgString);
                        }
                    };
                    AnnRichTextObject.prototype.getTextWidth = function (text, font, fontSize, isBold, isItalic) {
                        var canvas = document.createElement("canvas");
                        var context = canvas.getContext("2d");
                        var textFont = '';
                        if (isBold > 0) {
                            textFont += 'Bold ';
                        }
                        if (isItalic > 0) {
                            textFont += 'Italic ';
                        }
                        textFont += fontSize + 'px ' + font;
                        context.font = textFont;
                        var metrics = context.measureText(text);
                        return metrics.width;
                    };
                    AnnRichTextObject.prototype.clone = function () {
                        var richTextObject = _super.prototype.clone.call(this);
                        richTextObject.richTextString = this.richTextString;
                        richTextObject.richTextSvgString = this.richTextSvgString;
                        richTextObject.loadSvgImage();
                        return richTextObject;
                    };
                    AnnRichTextObject.prototype.serialize = function (options, parentNode, document) {
                        _super.prototype.serialize.call(this, options, parentNode, document);
                        var value = this.richTextString;
                        var element = document.createElement("RichTextString");
                        var data = value == null ? "" : value;
                        var node = document.createTextNode(data);
                        element.appendChild(node);
                        parentNode.appendChild(element);
                    };
                    AnnRichTextObject.prototype.deserialize = function (options, element, document) {
                        _super.prototype.deserialize.call(this, options, element, document);
                        var data = "";
                        var xmlElement = element;
                        var nodeList = xmlElement.getElementsByTagName("RichTextString");
                        for (var i = 0; i < nodeList.length; i++) {
                            var childNode = nodeList[i];
                            if (childNode != null && (childNode.parentNode == element)) {
                                data = childNode.firstChild.nodeValue.trim();
                                break;
                            }
                        }
                        this.richTextString = data;
                        this.isSvgTextValid = false;
                        this.loadSvgImage();
                    };
                    return AnnRichTextObject;
                }(lt.Annotations.Core.AnnRectangleObject));
                AnnotationsDemo.AnnRichTextObject = AnnRichTextObject;
            })(AnnotationsDemo = Basic.AnnotationsDemo || (Basic.AnnotationsDemo = {}));
        })(Basic = Demos.Basic || (Demos.Basic = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
