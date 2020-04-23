
    require([
        'jquery',
         'uiRegistry',
        'chosen',
        'domReady!'
        
    ], function ($,uiRegistry) {
        'use strict';
         console.log('DOM is loaded');
         uiRegistry.get("product_form.product_form.product-details.quantity_and_stock_status_qty.qty", function (element) {
                console.log('qty  element loaded');
                setTimeout(function(){
                    console.log('Calling select2');

					$('select[name="product[customer_company]"]').chosen();

                },3000);                                                                
                
         });
    });
  