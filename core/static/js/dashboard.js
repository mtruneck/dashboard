
function DashboardWidget(gridster, widget_params){
    this.gridster = gridster;
	p = widget_params;

	// Handle default values
    function handle_default(variable, default_value){
		if (variable !== 'undefined') {
			return variable;
		} else {
			return default_value;
		}
    }
	p.content   = handle_default(p.content,'');
	p.minimized = handle_default(p.minimized, 'false');
	p.size_x    = handle_default(p.size_x, 3);
	p.size_y    = handle_default(p.size_y, 2 );
	p.scrolling = handle_default(p.scrolling, 'no' );
	p.maximized_sizey = handle_default(p.maximized_sizey, p.size_y );

    // Prepare some values for the template
	if (p.minimized == "true") {
		p.minimizer_class = "max";
		p.minimizer_title = "Restore height";
	} else {
		p.minimizer_class = "min";
		p.minimizer_title = "Minimize up to hight 1";
	}

	// Get the HTML code for the widget
	element_code = _.template(this.template,p);

	// Let the gridster chose the position if not defined
	if (typeof p.col == 'undefined' || typeof p.row == 'undefined') {
		this.el = gridster.add_widget(element_code, p.size_x, p.size_y);
	} else {
		this.el = gridster.add_widget(element_code, p.size_x, p.size_y, p.col, p.row);
	}

	this.el.on( 'click', '.remover',     _.bind(this.close,             this) );
	this.el.on( 'click', '.scroll_lock', _.bind(this.toggle_scrollbars, this) );
	this.el.on( 'click', '.minimizer',   _.bind(this.minimize,          this) );
	this.el.on( 'click', '.reloader',    _.bind(this.reload,            this) );
	this.el.on( 'click', '.urler',       _.bind(this.toggle_urler,      this) );
    this.el.on( 'click', '.urlerbutton', _.bind(this.change_url,        this) );

	return this;
}

fn = DashboardWidget.prototype;

// HTML Template for the widget
fn.template = $("#widget_template").html();

fn.close = function() {
	this.gridster.remove_widget( this.el );
};

fn.reload = function() {
	$iframe = this.el.find("iframe");
	$iframe.attr('src', $iframe.attr('src'));
};

fn.toggle_scrollbars = function(){
	$iframe = this.el.find("iframe");
	scrolling = $iframe.attr("scrolling");
	scrolling = scrolling=="yes" ? "no" : "yes";
	$iframe.attr("scrolling", scrolling);
}

fn.minimize = function(){
	$widget = this.el;
	$minimizer = $widget.find('.minimizer');
	var current_sizex = parseInt($widget.attr('data-sizex'));
	var current_sizey = parseInt($widget.attr('data-sizey'));
	var maximized_sizey = parseInt($widget.attr('maximized-sizey'));

	if ($widget.attr('minimized') == "false") {
		$widget.attr('maximized-sizey', current_sizey)
		this.gridster.resize_widget( $widget, current_sizex, 1, false );
		$minimizer.removeClass("min").addClass("max");
		$minimizer.attr('title', 'Restore height');
		$widget.attr('minimized', 'true');
	} else {
		this.gridster.resize_widget( $widget, current_sizex, maximized_sizey, false );
		$minimizer.removeClass("max").addClass("min");
		$minimizer.attr('title', 'Minimize up to hight 1');
		$widget.attr('minimized', 'false');
	}
};

fn.toggle_urler = function(){
	$widget = this.el;
	$urler_input = $widget.find(".urlerinput");
	$iframe = $widget.find("iframe");
	$urler_form = $widget.find(".urler_form");

	$urler_input.val( $iframe.attr("src") );
	$urler_form.toggle();
};

fn.change_url = function(){
	$widget = this.el;
	$iframe = $widget.find("iframe");
	$urler_form = $widget.find(".urler_form");
	$urler_input = $widget.find(".urlerinput");

	$iframe.attr('src', $urler_input.val());
	$urler_form.toggle();
};










function Dashboard(el){
	this.el = $(el);
	this.init();
	this.widgets = [];
	return this;
}

fn = Dashboard.prototype;
fn.init = function(){

	// Gridster element initialization
	this.gridster = this.el.gridster({
		widget_margins: [3, 3],
		widget_base_dimensions: [200, 100],
		min_cols: 6,
		resize: { enabled: true },
		serialize_params: function($w, wgd) { 
			return { 
				content: $($w).find('iframe').attr('src'),
				scrolling: $($w).find('iframe').attr('scrolling'),
				title: $($w).attr('title'), 
				minimized: $($w).attr('minimized'), 
				maximized_sizey: $($w).attr('maximized-sizey'),
				col: wgd.col, 
				row: wgd.row, 
				size_x: wgd.size_x, 
				size_y: wgd.size_y 
			};
		}
	}).data('gridster');

};

fn.add = function(widget_params){
    widget = new DashboardWidget(this.gridster, widget_params);
	return widget;
};

