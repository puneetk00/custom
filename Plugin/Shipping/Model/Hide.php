<?php

namespace Synapse\Custom\Plugin\Shipping\Model;

class Hide
{
	protected $_cart;
	
	public function __construct(
	\Magento\Checkout\Model\Cart $cart,
	\Magento\Backend\Model\Session\Quote $backendQuoteSession 
	)
    {
        $this->_cart = $cart;
		$this->backendQuoteSession = $backendQuoteSession; 
    
	}
    public function aroundCanCollectRates($subject, callable $proceed)
    {
		//$totalSets = $this->_cart->getQuote()->getItemsQty();
		$totalSets = 0;
		if(isset($_REQUEST['isAjax'])){
			return $proceed();
			//$totalSets = $this->backendQuoteSession->getQuote()->getItemsQty();
		}else{
			$totalSets = $this->_cart->getQuote()->getItemsQty();
		}
		
		$totalQuantity = $totalSets*250;
		
		if($totalQuantity>4250) {
			return $proceed();
			
		} else {
			 return false;
		} 
		
        
    }
}