<?php
namespace Synapse\Custom\Block\Adminhtml\Pdf;
use Magento\Framework\View\Element\Template;

class Item extends Template
{
	 protected $_backendUrl;
	
	public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Magento\Backend\Model\UrlInterface $backendUrl,
        array $data = []
    )
    {
		$this->_backendUrl = $backendUrl;
        parent::__construct($context, $data);
    }
	
    public function getPdfUrl($item_id)
    {
        $params = array('item_id'=>$item_id);
        return $url = $this->_backendUrl->getUrl("pdfdesign/designpdf/index", $params);
    }
	 public function getDesignimageUrl($item_id)
    {
        $params = array('item_id'=>$item_id);
        return $url = $this->_backendUrl->getUrl("designimage/designimage/index", $params);
    }
}