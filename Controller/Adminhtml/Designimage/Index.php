<?php
  namespace Synapse\Custom\Controller\Adminhtml\Designimage;

  class Index extends \Magento\Backend\App\Action
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
        \Magento\Framework\View\Result\PageFactory $resultPageFactory
    ) {
         parent::__construct($context);
         $this->resultPageFactory = $resultPageFactory;
    }

    /**
     * Load the page defined in view/adminhtml/layout/exampleadminnewpage_helloworld_index.xml
     *
     * @return \Magento\Framework\View\Result\Page
     */
    public function execute()
    {
         return  $resultPage = $this->resultPageFactory->create();
    }
  }
?>


 <?php
// namespace Synapse\Custom\Controller\Adminhtml\Designimage;
// use Magento\Backend\App\Action\Context;
// use Magento\Framework\App\Filesystem\DirectoryList;
// use Magento\Framework\View\Result\PageFactory;
// require_once('lib/TCPDF/TCPDF.php');

// class Index extends \Magento\Backend\App\Action
// {
  // protected $_publicActions = ['index'];
	// /**
     // * @var PageFactory
     // */
    // protected $resultPageFactory;
	// protected $orderItemRepository;
	// protected $fileFactory;
	// protected $_storeManager;
	// protected $_urlInterface;
	// protected $filesystem;

    // /**
     // * @param Context $context
     // * @param PageFactory $resultPageFactory
     // */
    // public function __construct(
        // Context $context,
		// \Magento\Sales\Api\OrderItemRepositoryInterface $orderItemRepository,
        // PageFactory $resultPageFactory,
		// \Magento\Store\Model\StoreManagerInterface $storeManager,
        // \Magento\Framework\UrlInterface $urlInterface,
		// \Magento\Framework\Filesystem $filesystem,
		// \Magento\Framework\App\Response\Http\FileFactory $fileFactory
    // ) {
        // $this->resultPageFactory = $resultPageFactory;
		// $this->orderItemRepository = $orderItemRepository;
		// $this->fileFactory = $fileFactory;
		// $this->_storeManager = $storeManager;
		// $this->filesystem = $filesystem;
        // $this->_urlInterface = $urlInterface;
		// parent::__construct($context);
    // }

    // /**
     // * @return \Magento\Framework\View\Result\Page
     // */
    // public function execute()
    // {
		 
		  // return  $resultPage = $this->resultPageFactory->create();
		// // if($this->getRequest()->getParam('item_id')) {
			// // $item_id = $this->getRequest()->getParam('item_id');
			// // $itemCollection = $this->orderItemRepository->get($item_id);
			// // $cardJson = '';
			// // $itemCollection->getJsonCard();
		// // }	
		
		 // // $resultPage = $this->resultPageFactory->create();
        // // $resultPage->getConfig()->getTitle()->prepend(__(' heading '));

        // // $block = $resultPage->getLayout()
                // // ->createBlock('Synapse\Custom\Block\Adminhtml\Designimage\Index')
                // // ->setTemplate('Synapse_Custom::designimage.phtml')
				// // ->setData($itemCollection->getData())
                // // ->toHtml();
        // // $this->getResponse()->setBody($block);
		
		// //return  $resultPage = $this->resultPageFactory->create();
    // }
// }
