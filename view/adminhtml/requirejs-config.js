/**
 * Synapse India
 * Author: Puneet Kumar
 * 
 * 
 * @package    Synapse
 * @copyright  Copyright © 2006-2019 Synaopse
 * 
 */
 
 var config = {

	paths: {
		'fabric': 'Synapse_Custom/js/febric-min',
		'jqueryui': 'Synapse_Custom/js/jquery-ui',
		'intro': 'Synapse_Custom/js/lib/intro',
		'boundary_limit': 'Synapse_Custom/js/boundary_limit',
		'fontfaceobserver': 'Synapse_Custom/js/fontfaceobserver',
		'customiseControls': 'Synapse_Custom/js/customiseControls',
		'aligning_guidelines': 'Synapse_Custom/js/aligning_guidelines',
		//'colorpicker': 'Synapse_Custom/js/jquery.colorpicker',
		'jquery-mask': 'Synapse_Custom/js/jquery-mask',
		'font': 'Synapse_Custom/js/font',
		'tour-scripts': 'Synapse_Custom/js/tour-scripts',
		'reviewcard': 'Synapse_Custom/js/reviewcard',
		'chosen': 'Synapse_Custom/js/chosen.jquery'
    }, 
	shim: {
        'fabric'	 		: 	['jquery'],
        'jqueryui' 			:  	['jquery'],
        'fontfaceobserver' 	: 	['jquery'],
        'customiseControls' : 	['jquery'],
        'font' 				: 	['jquery'],
        //'colorpicker' 		:	{ deps: ['jquery','fabric','jqueryui','reviewcard'] },
        'aligning_guidelines' :	['jquery'], 
		'boundary_limit' 	:	['jquery'], 
        'intro' 			:	['jquery'], 
        'tour-scripts' :	['jquery'],
		'jquery-mask' :	['jquery'],
		'reviewcard' 			: 	['jquery'],
		"chosen": ["jquery"]
    }
}