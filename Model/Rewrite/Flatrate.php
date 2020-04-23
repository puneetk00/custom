<?php 
namespace Synapse\Custom\Model\Rewrite;
use Magento\OfflineShipping\Model\Carrier\Flatrate\ItemPriceCalculator;
use Magento\Quote\Model\Quote\Address\RateRequest;
use Magento\Shipping\Model\Carrier\AbstractCarrier;
use Magento\Shipping\Model\Carrier\CarrierInterface;
use Magento\Shipping\Model\Rate\Result;
class Flatrate extends \Magento\OfflineShipping\Model\Carrier\Flatrate{
	 public function __construct(
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Quote\Model\Quote\Address\RateResult\ErrorFactory $rateErrorFactory,
        \Psr\Log\LoggerInterface $logger,
        \Magento\Shipping\Model\Rate\ResultFactory $rateResultFactory,
        \Magento\Quote\Model\Quote\Address\RateResult\MethodFactory $rateMethodFactory,
        \Magento\OfflineShipping\Model\Carrier\Flatrate\ItemPriceCalculator $itemPriceCalculator,
		\Magento\Customer\Model\SessionFactory $customerSession,
        array $data = []
    ) {
		 $this->itemPriceCalculator = $itemPriceCalculator;
         $this->_customerSession = $customerSession->create();
        parent::__construct($scopeConfig, $rateErrorFactory, $logger, $rateResultFactory,$rateMethodFactory,$itemPriceCalculator,$data);
    }
	
	 public function collectRates(RateRequest $request)
    {
        if (!$this->getConfigFlag('active')) {
            return false;
        }

        $freeBoxes = $this->getFreeBoxesCount($request);
        $this->setFreeBoxes($freeBoxes);

        /** @var Result $result */
        $result = $this->_rateResultFactory->create();

        
		
		 if ($this->_customerSession->isLoggedIn()) {
            $customer_id =  $this->_customerSession->getId();
			$objectManager = \Magento\Framework\App\ObjectManager::getInstance();
			$customerObj = $objectManager->create('Magento\Customer\Model\Customer')->load($customer_id);
			// if($customerObj->getFlatcharges() && $customerObj->getFlatcharges()>0){
				// $shippingPrice = $customerObj->getFlatcharges();
			// }else{
				// $shippingPrice = $this->getShippingPrice($request, $freeBoxes);
			// }
			$customer_company = $customerObj->getCompany();
			$customer_account = $customerObj->getCustomerAccount();
			switch ($customer_company) {
				case 'National Freight':
				case 'National Freight,  Inc.':
				case 'Dairyland Seed':
				case 'Dairyland Seed Co., Inc.':
				case 'SAIA motor freight':
				case 'Saia Motor Freight Line':
				case 'CFI':
				case 'Cfi':
					$shippingPrice = 5;
					break;
				case 'Fields Auto':
				case 'Fields Auto Group':
				case 'Fields Auto Group ':
					$shippingPrice = 3;
					break;
				default:
					switch ($customer_account) {
						case '141413':
						case '141410':
						case '111136':
						case '100123':
							$shippingPrice = 5;
							break;
						default:
						return false;
							
					}
					//$shippingPrice = $this->getShippingPrice($request, $freeBoxes);
			}
			
        }else{
			return false;
			//$shippingPrice = $this->getShippingPrice($request, $freeBoxes);
		}
        if ($shippingPrice !== false) {
            $method = $this->createResultMethod($shippingPrice);
            $result->append($method);
        }

        return $result;
    }
	private function getShippingPrice(RateRequest $request, $freeBoxes)
    {
        $shippingPrice = false;

        $configPrice = $this->getConfigData('price');
        if ($this->getConfigData('type') === 'O') {
            // per order
            $shippingPrice = $this->itemPriceCalculator->getShippingPricePerOrder($request, $configPrice, $freeBoxes);
        } elseif ($this->getConfigData('type') === 'I') {
            // per item
            $shippingPrice = $this->itemPriceCalculator->getShippingPricePerItem($request, $configPrice, $freeBoxes);
        }

        $shippingPrice = $this->getFinalPriceWithHandlingFee($shippingPrice);

        if ($shippingPrice !== false && $request->getPackageQty() == $freeBoxes) {
            $shippingPrice = '0.00';
        }
        return $shippingPrice;
    }
	  private function createResultMethod($shippingPrice)
    {
        /** @var \Magento\Quote\Model\Quote\Address\RateResult\Method $method */
        $method = $this->_rateMethodFactory->create();

        $method->setCarrier('flatrate');
        $method->setCarrierTitle($this->getConfigData('title'));

        $method->setMethod('flatrate');
        $method->setMethodTitle($this->getConfigData('name'));

        $method->setPrice($shippingPrice);
        $method->setCost($shippingPrice);
        return $method;
    }
}