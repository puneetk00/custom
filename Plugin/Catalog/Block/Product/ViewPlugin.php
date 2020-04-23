<?php
/**
 * Copyright � Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Synapse\Custom\Plugin\Catalog\Block\Product;

use Magento\Customer\Model\Session;
use Magento\Framework\Message\ManagerInterface;
use Magento\Framework\App\Response\Http as ResponseHttp;

class ViewPlugin
{
	protected $_customerSession;
    /** @var ManagerInterface **/
    protected $messageManager;
    /** @var Http **/
    protected $responseHttp;
	
	private $state;
	
	/*
	*
	*/
	public function __construct(
        \Magento\Customer\Model\SessionFactory $customerSession,
		\Magento\Framework\App\State $state,
		ManagerInterface $messageManager,
        ResponseHttp $responseHttp
    )
    {
		$this->state = $state;
        $this->_customerSession = $customerSession;
        $this->messageManager = $messageManager;
        $this->responseHttp = $responseHttp;
    }
	
	/*
	*
	*/
	public function beforeGetProduct(\Magento\Catalog\Block\Product\View $subject){
		$customer = $this->_customerSession->create();
		
		if (!$customer->getCustomer()->getId()) {
			$this->messageManager->addErrorMessage(__('Please login first to see design business card'));
			$this->responseHttp->setRedirect('/customer/account/login');
		}
    }
	
}