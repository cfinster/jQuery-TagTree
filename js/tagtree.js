/**
 * @author Karel-Jan Van Haute
 * 
 * https://github.com/kareljan/jQuery-TagTree
 * 
 * Plugin only tested on Mac in Firefox 6.0 for now
 */
(function( $, undefined ) {

$.widget( "ui.tagtree", {
	version: "0.1",
	options: {
		mainElement: 'body',
		selectClass: '.selected',
		
		max: 100
	},

	min: 0,

	_create: function() {
		var tagTreeList = (this.tagTreeList = $('<ul></ul>'))
				.appendTo(this.element);
		
		this._drawTree();
	},

	_destroy: function() {
		this.tagTreeList.remove();
	},

	_setOption: function( key, value ) {
		var self = this;
		if ( key === "mainElement" ) {
			this.options.mainElement = value;
			self._drawTree();
		}
		if ( key === "selectClass" ) {
			this.options.selectClass = value;
			self._drawTree();
		}
	},
	
	_drawTree: function(){
		var self = this;
		
		$('span', self.tagTreeList).each(function(){
			$(this).trigger('mouseleave');
		});
		
		self.tagTreeList.empty();
		
		if($(self.options.selectClass).get(0) != $(self.options.mainElement).get(0)){
			
			self.tagTreeList.append('<li>'+self._getEntireName($(self.options.selectClass))+'</li>');
			
			$(self.options.selectClass, self.options.mainElement);
			$(self.options.selectClass, self.options.mainElement).parentsUntil(self.options.mainElement).each(function(){
				var treeElement = $('<li><span>'+self._getEntireName($(this))+'</span></li>');
				self.tagTreeList.prepend(treeElement);
				$('span', treeElement)
				.data('domElement', $(this))
				.click(function(event){
					self._trigger('click', event, $(this).data('domElement'));
				})
				.mouseenter(function(event){
					self._trigger('mouseenter', event, $(this).data('domElement'));
				})
				.mouseleave(function(event){
					self._trigger('mouseleave', event, $(this).data('domElement'));
				});			
			});
			
					
			var mainTreeElement = $('<li><span>'+self._getEntireName($(self.options.mainElement))+'</span></li>');
			self.tagTreeList.prepend(mainTreeElement);
			$('span', mainTreeElement)
			.data('domElement', $(self.options.mainElement))
			.click(function(event){
				self._trigger('click', event, $(this).data('domElement'));
			})
			.mouseenter(function(event){
				self._trigger('mouseenter', event, $(this).data('domElement'));
			})
			.mouseleave(function(event){
				self._trigger('mouseleave', event, $(this).data('domElement'));
			});	
		
		}
		else{
			self.tagTreeList.append('<li>'+self._getEntireName($(self.options.mainElement))+'</li>');
		}
	},
	
	_getEntireName: function(element){
		var name = $(element).get(0).tagName.toLowerCase();
		if($(element).attr('id')) name += "#"+$(element).attr('id');
		if($(element).attr('class')) name += "."+$(element).attr('class').replace(' ', '.');
		name = name.replace(this.options.selectClass, '');
		return name;
	},

	refresh: function(){
		this._drawTree();
	}
});

})( jQuery );
