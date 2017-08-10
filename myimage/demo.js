


	////////////////////////////////////////////////////////////////////////////////
// AnnTriangleObject 我们需要创建一个自定义注释对象类型
	function one(num){
		AnnTriangleObject = function AnnTriangleObject() {
			AnnTriangleObject.initializeBase(this);
			this.set_isClosed(false); // triangle is a closed figure //三角形是封闭的图形
			this.setId(num); // set the object id
			this.set_tag(null);
		}
		AnnTriangleObject.prototype = {
			create: function AnnTriangleObject$create() {
				// define the custom annotation object (the triangle is a polyline with only 3 points)
				return new AnnTriangleObject();
			}
		}
		AnnTriangleObject.registerClass('AnnTriangleObject', lt.Annotations.Core.AnnPolylineObject);
	}
	//one(-99);
	////////////////////////////////////////////////////////////////////////////////
// AnnTriangleDrawDesigner 创建绘图设计器类
	function two(num){
		AnnTriangleDrawDesigner = function AnnTriangleDrawDesigner(automationControl, container, annPolyineObject) {
			AnnTriangleDrawDesigner.initializeBase(this, [automationControl, container, annPolyineObject]);
		}
		AnnTriangleDrawDesigner.prototype = {
			// override the onPointerDown method and add 3 points for our triangle
			onPointerDown: function AnnTriangleDrawDesigner$onPointerDown(sender, e) {
				var handled = AnnTriangleDrawDesigner.callBaseMethod(this, 'onPointerDown', [sender, e]);
				if (this.get_targetObject().get_points().get_count() < num) {
					this.get_targetObject().set_tag('drawing');
					if (e.get_button() === lt.Annotations.Core.AnnMouseButton.left) {
						if (this.startWorking()) {
							this.get_targetObject().get_points().add(e.get_location());
						}
						handled = true;
					}
				}
				return handled;
			},

			// override the onPointerUp method and end the drawing when we have our 3 points
			onPointerUp: function AnnTriangleDrawDesigner$onPointerUp(sender, e) {
				var handled = AnnTriangleDrawDesigner.callBaseMethod(this, 'onPointerUp', [sender, e]);
				handled = true;
				if (this.get_targetObject().get_points().get_count() >= num) {
					this.get_targetObject().set_tag(null);
					this.endWorking();
				}

				this.invalidate(lt.LeadRectD.empty);
				return handled;
			}
		}
		AnnTriangleDrawDesigner.registerClass('AnnTriangleDrawDesigner', lt.Annotations.Designers.AnnDrawDesigner);
	}
	//two(num);


	////////////////////////////////////////////////////////////////////////////////
// AnnTriangleEditDesigner 创建编辑设计器类
// We won't actually need to do any customization of this class.
	function three(){
		AnnTriangleEditDesigner = function AnnTriangleEditDesigner(automationControl, container, annPolylineObject) {
			AnnTriangleEditDesigner.initializeBase(this, [automationControl, container, annPolylineObject]);
		}
		AnnTriangleEditDesigner.registerClass('AnnTriangleEditDesigner', lt.Annotations.Designers.AnnPolylineEditDesigner);

	}
	//three();
	////////////////////////////////////////////////////////////////////////////////
// AnnTriangleRenderer 创建一个自定义渲染器
	function four(){
		AnnTriangleRenderer = function AnnTriangleRenderer() {
			AnnTriangleRenderer.initializeBase(this);
		}
		AnnTriangleRenderer.prototype = {

			// Override the Render method in order to draw the 3 points as the user creates them.
			render: function AnnTriangleRenderer$render(mapper, annObject) {
				AnnTriangleRenderer.callBaseMethod(this, 'render', [mapper, annObject]);
				// if we are finished 'drawing', allow the base class AnnPolylineObjectRenderer to handle the job
				if (annObject.get_tag() !== 'drawing') {
					return;
				}
				var engine = Type.safeCast(this.get_renderingEngine(), lt.Annotations.Rendering.AnnHtml5RenderingEngine);
				if (engine != null) {
					var context = engine.get_context();
					if (context != null) {
						context.save();
						var points = mapper.pointsFromContainerCoordinates(annObject.get_points().toArray(), annObject.get_fixedStateOperations());
						lt.Annotations.Rendering.AnnHtml5RenderingEngine.setStroke(context, lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create('green'), lt.LeadLengthD.create(1)));
						context.beginPath();
						for (var x = 0; x < points.length; x++) {
							var point = points[x];
							if (!point.get_isEmpty()) {
								var rect = lt.LeadRectD.create(point.get_x() - 10, point.get_y() - 10, 20, 20);
								lt.Annotations.Rendering.AnnHtml5RenderingEngine.drawEllipse(context, rect);
							}
						}
						context.closePath();
						context.stroke();
						context.restore();
					}
				}
			}
		}
		AnnTriangleRenderer.registerClass('AnnTriangleRenderer', lt.Annotations.Rendering.AnnPolylineObjectRenderer);

	}
	//four();

////////////////////////////////////////////////////////////////////////////////
	// Create the custom automation object and hook the designers
	//将LEADTOOLS ImageViewer和自动注释对象粘在一起的代码。
	function createTriangleAutomationObject(annObject) {



		var automationObj = new lt.Annotations.Automation.AnnAutomationObject();
		automationObj.set_id(annObject.get_id());
		automationObj.set_name("Triangle");
		automationObj.set_drawDesignerType(AnnTriangleDrawDesigner); // hook the custom draw designer
		automationObj.set_editDesignerType(AnnTriangleEditDesigner); // hook the custom edit designer
		automationObj.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);

		// set up the thumbs
		var annTriangleRenderer = new AnnTriangleRenderer();
		var annPolylineRenderer = this._renderingEngine.get_renderers()[lt.Annotations.Core.AnnObject.polylineObjectId];
		annTriangleRenderer.set_locationsThumbStyle(annPolylineRenderer.get_locationsThumbStyle());
		annTriangleRenderer.set_rotateCenterThumbStyle(annPolylineRenderer.get_rotateCenterThumbStyle());
		annTriangleRenderer.set_rotateGripperThumbStyle(annPolylineRenderer.get_rotateGripperThumbStyle());

		this._renderingEngine.get_renderers()[annObject.get_id()] = annTriangleRenderer;   // hook the custom renderer
		automationObj.set_objectTemplate(annObject);
		return automationObj;
	}

	function newTriangle() {


		// Create the triangle object
		var triangle = new AnnTriangleObject();
		var brush = new lt.Annotations.Core.AnnSolidColorBrush();
		brush.set_color("blue");
		triangle.set_fill(brush);
		// Create a user defined automation object
		var automation = createTriangleAutomationObject(triangle);
		this._manager.get_objects().add(automation);
	}
	function newOne(num){
		one(num);
		two(num);
		three();
		four();
	}
var num =3;
	function pageLoad() {

		newOne(num);

		// Create the viewer
		var createOptions = new lt.Controls.ImageViewerCreateOptions(document.getElementById('imageViewerDiv'));
		this._viewer = new lt.Controls.ImageViewer(createOptions);
		// Watch item changed event to set container size and the current object id when the image get loaded
		_viewer.add_itemChanged(automationControl_ItemChanged);
		//_viewer.add_itemChanged(automationControl_ItemChanged);

		// Set the image URL - load using browser support
		this._viewer.set_imageUrl("image/101.jpg");


		// Set viewer image resolution
		//设置查看器图像分辨率
		var resolution = lt.LeadSizeD.create(72, 72);
		_viewer.set_imageResolution(resolution);

		// Create the annotation automation control and attach image viewer to it
		//创建注释自动化控制和附加的图像查看器
		this._imageViewerAutomationControl = new lt.Annotations.JavaScript.ImageViewerAutomationControl();
		this._imageViewerAutomationControl.imageViewer = _viewer;

		// Create the automation manager, and default objects
		this._manager = new lt.Annotations.Automation.AnnAutomationManager();
		this._manager.createDefaultObjects();

		// Create Html5 rendering engine and bind it to the automation manager
		//创建Html5渲染引擎并将其绑定到自动化管理
		this._renderingEngine = new lt.Annotations.Rendering.AnnHtml5RenderingEngine();
		this._manager.set_renderingEngine(this._renderingEngine);

		// Create Automation interactive mode instance and bind automation control to it
		//创建自动化交互模式实例并结合自动化控制
		this._automationInteractiveMode = new lt.Annotations.JavaScript.AutomationInteractiveMode();
		this._automationInteractiveMode.automationControl = _imageViewerAutomationControl;

		// Add automation interactive mode to the viewer interactive modes list and enable it
		//自动化交互模式添加到列表和观众互动模式启用它
		_viewer.get_interactiveModes().beginUpdate();
		_viewer.get_interactiveModes().add(_automationInteractiveMode);
		_automationInteractiveMode.set_isEnabled(true);
		_viewer.get_interactiveModes().endUpdate();

		// Create the annotation automation object and set it to active
		//创建注释自动化对象并将其设置为活跃
		this._automation = new lt.Annotations.Automation.AnnAutomation(this._manager, _imageViewerAutomationControl);
		this._automation.set_active(true);

		newTriangle();

	}

	function automationControl_ItemChanged(sender, e) {
		if (e.reason == lt.Controls.ImageViewerItemChangedReason.url) {

			// Get loaded image size
			var imageSize = this._viewer.get_activeItem().get_imageSize();

			// Set container size with loaded image size
			var container = this._automation.get_container();
			container.set_size(container.get_mapper().sizeToContainerCoordinates(lt.LeadSizeD.create(imageSize.get_width(), imageSize.get_height())));

			// Set traingle object id to the current object id
			this._manager.set_currentObjectId(num++);
		}
	}


	function addOne(){

			// assumes _automation is valid
			var inch = 720.0;
			// Add a freehand hotspot object
			var polyLineObj = new lt.Annotations.Core.AnnPolylineObject();
			// Set the points for the freehand hotspot
			polyLineObj.get_points().add(lt.LeadPointD.create(1 * inch, 1 * inch));
			polyLineObj.get_points().add(lt.LeadPointD.create(2 * inch, 1 * inch));
			polyLineObj.get_points().add(lt.LeadPointD.create(2 * inch, 2 * inch));
			polyLineObj.get_points().add(lt.LeadPointD.create(1 * inch, 2 * inch));
			//polyLineObj.get_points().add(lt.LeadPointD.create(5 * inch, 5 * inch));
			//polyLineObj.get_points().add(lt.LeadPointD.create(5 * inch, 1 * inch));
			// Set the stroke
			polyLineObj.set_stroke(lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("red"), lt.LeadLengthD.create(3)));
			// Set the fill
			polyLineObj.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create("green"));
			// Set the figure to closed
			polyLineObj.set_isClosed(true);
			// Add the object to the automation container
			this._automation.get_container().get_children().add(polyLineObj);
			// Select the object
			this._automation.selectObject(polyLineObj);
		this._automation.add_selectedObjectsChanged(function (resp) {
			console.log(num++)
		})

	}

	function onLoad1(){

			// Get the container DIV
			var imageViewerDiv = document.getElementById("imageViewerDiv");
			// Create the image viewer inside it
			var createOptions = new lt.Controls.ImageViewerCreateOptions(imageViewerDiv);
			var imageViewer = new lt.Controls.ImageViewer(createOptions);
			// Add handler to show an alert on errors
			imageViewer.itemError.add(function (sender, e) {
				alert("Error loading " + e.data.srcElement.src);
			});
			// Load an image in the viewer
			imageViewer.imageUrl = "image/101.jpg";


		// Set the interactive mode
		var interactiveMode = document.getElementById("interactiveMode");
		interactiveMode.addEventListener("change", function () {
			var modeName = interactiveMode.options[interactiveMode.selectedIndex].innerHTML;
			switch (modeName) {
				case"Pan and Zoom":
					imageViewer.defaultInteractiveMode = new lt.Controls.ImageViewerPanZoomInteractiveMode();
					break;
				case"Zoom To":
					imageViewer.defaultInteractiveMode = new lt.Controls.ImageViewerZoomToInteractiveMode();
					break;
				case"Mag Glass":
					imageViewer.defaultInteractiveMode = new lt.Controls.ImageViewerMagnifyGlassInteractiveMode();
					break;
				case"Center At":
					imageViewer.defaultInteractiveMode = new lt.Controls.ImageViewerCenterAtInteractiveMode();
					break;
				case"Rubberband":
					imageViewer.defaultInteractiveMode = new lt.Controls.ImageViewerRubberBandInteractiveMode();
					break;
				default:
					imageViewer.defaultInteractiveMode = new lt.Controls.ImageViewerNoneInteractiveMode();
					break;
			}
		}, false);

		// Set the size mode
		var sizeMode = document.getElementById("sizeMode");
		sizeMode.addEventListener("change", function () {
			var sizeModeName = sizeMode.options[sizeMode.selectedIndex].innerHTML;
			switch (sizeModeName) {
				case"Actual Size":
					imageViewer.zoom(lt.Controls.ControlSizeMode.actualSize, 1, imageViewer.defaultZoomOrigin);
					break;
				case"Fit":
					imageViewer.zoom(lt.Controls.ControlSizeMode.fit, 1, imageViewer.defaultZoomOrigin);
					break;
				case"Fit Always":
					imageViewer.zoom(lt.Controls.ControlSizeMode.fitAlways, 1, imageViewer.defaultZoomOrigin);
					break;
				case"Fit Width":
					imageViewer.zoom(lt.Controls.ControlSizeMode.fitWidth, 1, imageViewer.defaultZoomOrigin);
					break;
				case"Fit Height":
					imageViewer.zoom(lt.Controls.ControlSizeMode.fitHeight, 1, imageViewer.defaultZoomOrigin);
					break;
				case"Stretch":
					imageViewer.zoom(lt.Controls.ControlSizeMode.stretch, 1, imageViewer.defaultZoomOrigin);
					break;
				default:
					imageViewer.zoom(lt.Controls.ControlSizeMode.none, 1, imageViewer.defaultZoomOrigin);
					break;
			}
		}, false);

	}

	function showWord(){

			// Init the document viewer, pass along the panels
			var createOptions = new lt.Documents.UI.DocumentViewerCreateOptions();
			// We are not going to use elements mode in this example
			createOptions.viewCreateOptions.useElements = false;
			createOptions.thumbnailsCreateOptions.useElements = false;

			// Set thumbnailsContainer
			createOptions.thumbnailsContainer = document.getElementById("thumbnailsDiv");
			// Set viewContainer
			createOptions.viewContainer = document.getElementById("documentViewerDiv");

			// Create the document viewer
			this._documentViewer = lt.Documents.UI.DocumentViewerFactory.createDocumentViewer(createOptions);

			// Set interactive mode
			this._documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactivePanZoom);

			// We prefer SVG viewing
			this._documentViewer.view.preferredItemType = lt.Documents.UI.DocumentViewerItemType.svg;
			var _this = this;

			// Load a PDF document
			var url = "http://demo.leadtools.com/images/pdf/leadtools.pdf";
			lt.Documents.DocumentFactory.loadFromUri(url, null)
				.done( function(document) {
					// We have a document

					_this._documentViewer.operation.add(function (sender, e) {
						if (e.operation == lt.Documents.UI.DocumentViewerOperation.loadingBookmarks) {
							// Disable the bookmarks when we are loading, enable when we are done
							$("#right-panel").prop("disabled", !e.isPostOperation);
						}
					});

					// Set the document in the viewer
					_this._documentViewer.setDocument(document);

					// Run pan/zoom
					$("#interactiveSelect").val(lt.Documents.UI.DocumentViewerCommands.interactiveSelectText);
				})
				.fail(function (jqXHR, statusText, errorThrown) {
					alert("Error loading document: " + errorThrown)
				});

	}




