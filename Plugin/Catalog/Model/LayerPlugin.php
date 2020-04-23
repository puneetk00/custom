<?php 
namespace Synapse\Custom\Plugin\Catalog\Model;

use Magento\Customer\Model\Session;
use Magento\Framework\Message\ManagerInterface;
use Magento\Framework\App\Response\Http as ResponseHttp;

class LayerPlugin
{
	protected $_customerSession;
    /** @var ManagerInterface **/
    protected $messageManager;
    /** @var Http **/
    protected $responseHttp;
	
	private $state;
	
	protected $_registry;
	
	protected $_categoryModel;
	
	/*
	*
	*/
	public function __construct(
        \Magento\Customer\Model\SessionFactory $customerSession,
		\Magento\Framework\App\State $state,
        ManagerInterface $messageManager,
		\Magento\Framework\Registry $registry,
		\Magento\Catalog\Model\CategoryFactory $categoryFactory,
        ResponseHttp $responseHttp
    )
    {
		$this->state = $state;
        $this->_customerSession = $customerSession;
        $this->messageManager = $messageManager;
		$this->_categoryModel = $categoryFactory;
        $this->responseHttp = $responseHttp;
		 $this->_registry = $registry;
    }
	
	public function beforePrepareProductCollection(\Magento\Catalog\Model\Layer $layer,\Magento\Catalog\Model\ResourceModel\Collection\AbstractCollection $collection ) {
		
		//$this->state->setAreaCode(\Magento\Framework\App\Area::AREA_FRONTEND);
		$category = $this->_registry->registry('current_category');//get current category
		$cId = $category->getId();
		
		$PCategory = $this->_categoryModel->create()->load($cId);
		if(!$PCategory->getAllowForGuest()) {
			$customer = $this->_customerSession->create();
			if (!$customer->getCustomer()->getId()) {
				
				//$this->messageManager->addErrorMessage(__('Please login first to see design business card'));
				$this->responseHttp->setRedirect('/customer/account/login');
			}
			$ownerCompany=$customer->getCustomer()->getCompany();
			if($ownerCompany) {				
				$collection->addAttributeToFilter('customer_company', array('in' => array('all',$ownerCompany))); 
			}
			
		} 
	}
}
