<?php
namespace Synapse\Custom\Block\Adminhtml\Designimage;
use Magento\Backend\Block\Template;

class Index extends Template
{
	 public function __construct(
		\Magento\Backend\Block\Template\Context $context,
		\Magento\Sales\Api\OrderItemRepositoryInterface $orderItemRepository,
		\Magento\Framework\App\RequestInterface $request
    ) {
        
		$this->orderItemRepository = $orderItemRepository;
		$this->request = $request;
		parent::__construct($context);
    }
		
	public function getPost()
    {
        return $this->request->getParams();//in Magento 2.*
    }
	public function getOrderData(){
		$itemCollection = false;
		$params  = $this->getPost();
		
		if(isset($params['item_id'])) {
			$item_id = $params['item_id'];
			 
			$itemCollection = $this->orderItemRepository->get($item_id);
			 
		}
		return $itemCollection;
	}

    public function greet()
    {
        return 'Hello world';
    }

}