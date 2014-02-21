module('Dashboard', {
	setup: function() {
		$('<div class="gridster"><ul></ul></div>').appendTo('body');
	},
	teardown: function() {
		$('.gridster').remove();
	}
});

test("Dashboard - Constructor", function(){
	var dashboard = new Dashboard('.gridster > ul');
	ok(dashboard);
	ok(dashboard.el.parent().hasClass('ready'), 'Gridster element is ready');
});

module('Dashboard', {
	setup: function() {
		$('<div class="gridster"><ul></ul></div>').appendTo('body');
		dashboard = new Dashboard('.gridster > ul');
	},
	teardown: function() {
		delete dashboard;
		$('.gridster').remove();
	}
});

test("Creating new empty widget - checking defaults", function(){
    var widget = dashboard.add({});
	ok(widget);
	QUnit.equal(widget.el.find(".title").text(), "", "The title is empty");
	QUnit.equal(widget.el.data("refresh-interval"), "disabled", "The refresh interval is disabled");
	QUnit.equal(widget.el.find("iframe").attr('src'), "", "The widget's iframe src is empty");
	QUnit.equal(widget.el.attr("minimized"), "false", "The widget is not minimized by default");
	ok(widget.el.find('.minimizer').hasClass('min'), "The minimize button has proper class");
	QUnit.equal(widget.el.find("iframe").attr('scrolling'), "no", "The scrolling is disabled by default");
});

test("Creating new widget with particular params", function(){
	var widget = dashboard.add({
		size_x: 5,
		size_y: 1,
		title: "Testing widget",
		refresh: "10",
		content: "http://www.example.com",
		scrolling: 'yes',
		minimized: 'true',
		maximized_sizey: 5,
		});
	ok(widget);
	QUnit.equal(widget.el.attr("data-sizey"), "1", "The width is 1");
	QUnit.equal(widget.el.attr("data-sizex"), "5", "The height is 5");
	QUnit.equal(widget.el.find(".title").text(), "Testing widget", "The title is 'Testing widget'");
	QUnit.equal(widget.el.data("refresh-interval"), "10", "The refresh interval is set properly");
	QUnit.equal(widget.el.find("iframe").attr('src'), "http://www.example.com", "The widget's iframe src is set properly");
	QUnit.equal(widget.el.find("iframe").attr('scrolling'), "yes", "The scrolling is set properly");
	QUnit.equal(widget.el.attr("maximized-sizey"), "5", "The maximized size is set properly");
	QUnit.equal(widget.el.attr("minimized"), "true", "The minimized state is set properly");
	ok(widget.el.find('.minimizer').hasClass('max'), "The minimize button has proper class");
});


test("Closing the widget by close button", function(){
	stop();
	var widget = dashboard.add({ });
	ok(widget, 'wdiget is created');
	widget.el.find('.remover').click();
	setTimeout(function(){
		QUnit.equal(widget.el.css('display'), "none",
		"The widget is no longer displayed after clicking on Close button");
	}, 1000);
	setTimeout(function(){start();}, 2000)
});


test("Toggling scrolling of the widget by scroll_lock button", function(){
	var widget = dashboard.add({ });
	ok(widget, 'wdiget is created');
	QUnit.equal(widget.el.find("iframe").attr('scrolling'), "no", "The scrolling is disabled by default");
	widget.el.find('.scroll_lock').trigger('click');
	QUnit.equal(widget.el.find("iframe").attr('scrolling'), "yes", "The scrolling is changed to yes");
	widget.el.find('.scroll_lock').trigger('click');
	QUnit.equal(widget.el.find("iframe").attr('scrolling'), "no", "The scrolling is disabled again");
});

