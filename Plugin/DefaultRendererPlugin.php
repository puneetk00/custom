<?php 
namespace Synapse\Custom\Plugin;
use \Magento\Sales\Block\Adminhtml\Order\View\Items\Renderer\DefaultRenderer as Renderers;
class DefaultRendererPlugin
{
    public function aroundGetColumnHtml(Renderers $defaultRenderer, \Closure $proceed,\Magento\Framework\DataObject $item, $column, $field=null)
    {
		
		$sets = "NA";
         if ($column == 'custom_qtysets'){			
			 if($item->getSku()!='Miscellaneous product'){
				$array_sets = [1=>250,2=>500,4=>1000,8=>2000,12=>3000,16=>4000,20=>5000];
				$ordered_qty = number_format($item->getQtyOrdered(),0);
				if(array_key_exists($ordered_qty,$array_sets)){
					$sets = $array_sets[$ordered_qty];
				}
				$html = $sets;
				$result = $html;
			}else{
				$result = $sets;
			 }
         }else{
             if ($field){
                 $result = $proceed($item,$column,$field);
             }else{
                 $result = $proceed($item,$column);
             }
         }
        return $result;
    }
	public function aroundGetColumns(Renderers $defaultRenderer, \Closure $proceed){
		$writer = new \Zend\Log\Writer\Stream(BP . '/var/log/synapse.log');
		$logger = new \Zend\Log\Logger();
		$logger->addWriter($writer);
		$logger->info(__METHOD__);
		$returnValue = $proceed(); 
		
		 return $returnValue;
	}
}