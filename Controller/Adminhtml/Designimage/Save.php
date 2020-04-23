<?php
  namespace Synapse\Custom\Controller\Adminhtml\Designimage;

  class Save extends \Magento\Backend\App\Action
  {
    /**
    * @var \Magento\Framework\View\Result\PageFactory
    */
    protected $resultPageFactory;

    /**
     * Constructor
     *
     * @param \Magento\Backend\App\Action\Context $context
     * @param \Magento\Framework\View\Result\PageFactory $resultPageFactory
     */
    public function __construct(
        \Magento\Backend\App\Action\Context $context,
		\Magento\Sales\Api\OrderItemRepositoryInterface $orderItemRepository,
        \Magento\Framework\View\Result\PageFactory $resultPageFactory,
		\Magento\Framework\Controller\Result\JsonFactory $jsonResultFactory
    ) {
         parent::__construct($context);
		 $this->orderItemRepository = $orderItemRepository;
         $this->resultPageFactory = $resultPageFactory;
		 $this->jsonResultFactory = $jsonResultFactory;
    }

    
    public function execute()
    {
		$post = $this->getRequest()->getPostValue();
		$orderitemobj = $this->orderItemRepository->get($post['item_id']);
		$orderitemobj->setData('json_card', $post['jsonobj']);
		if(isset($post['objectjsonback'])){
			$orderitemobj->setData('json_card_back', $post['objectjsonback']);
		}
		$orderitemobj->save($orderitemobj);
		$result = $this->jsonResultFactory->create();
		$result->setData(['success' => __('success'),'id'=>$orderitemobj->getId()]);
        return $result;
    }
  }
?>
