<?php
namespace Synapse\Custom\Controller\Adminhtml\Updatepo;

class Index extends \Magento\Backend\App\Action
{
	protected $resultPageFactory;
	
	protected $_publicActions = ['index'];

    public function __construct(
        \Magento\Backend\App\Action\Context $context,
        \Magento\Framework\Controller\Result\JsonFactory $resultPageFactory
    ) {
        parent::__construct($context);
        $this->resultPageFactory = $resultPageFactory;
    }

    public function execute()
    {
        if($this->getRequest()->isAjax()){
            $post = $this->getRequest()->getPostValue();
			$orderId = $post['order_id'];
			$po_number = $post['po_number'];
			
			//update ponumber
			$objectManager = \Magento\Framework\App\ObjectManager::getInstance(); // Instance of object manager
			$resource = $objectManager->get('Magento\Framework\App\ResourceConnection');
			$connection = $resource->getConnection();
			
			//Update Data into table
			$paymentSql = 'Update sales_order_payment Set po_number ='.$po_number.' where entity_id ='. $orderId;
			$connection->query($paymentSql);
			
			$quoteSql = 'Update quote_payment Set po_number ='.$po_number.' where payment_id ='. $orderId;
			$connection->query($quoteSql);
			
			echo true;

        } else {
			$resultRedirect = $this->resultRedirectFactory->create();
			return $resultRedirect->setPath('admin/dashboard/index/'); 
			
		}
    }
}
