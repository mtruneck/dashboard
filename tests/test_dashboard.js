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

test("New Widget", function(){
    widget = dashboard.add({});
	ok(widget);
});


