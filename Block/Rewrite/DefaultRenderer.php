<?php 
namespace Synapse\Custom\Block\Rewrite;
 
class DefaultRenderer extends \Magento\Sales\Block\Adminhtml\Order\View\Items\Renderer\DefaultRenderer{
	 public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Magento\CatalogInventory\Api\StockRegistryInterface $stockRegistry,
        \Magento\CatalogInventory\Api\StockConfigurationInterface $stockConfiguration,
        \Magento\Framework\Registry $registry,
        \Magento\GiftMessage\Helper\Message $messageHelper,
        \Magento\Checkout\Helper\Data $checkoutHelper,
        array $data = []
    ) {
        parent::__construct($context, $stockRegistry, $stockConfiguration, $registry, $messageHelper, $checkoutHelper, $data);
    }
	 public function getColumns()
    {
        $columns = array_key_exists('columns', $this->_data) ? $this->_data['columns'] : [];
		unset($columns['custom_qtysets']);
		$new_array = array();
		foreach($columns as $k=>$v){
			$new_array[$k] = $v;
			if($k=='qty'){
				$new_array['custom_qtysets'] = 'col-custom_qtysets';
			}
		}
        return $new_array;
    }
}