<?php

namespace Synapse\Custom\Plugin\Flatrate;
use Magento\Framework\Exception\LocalizedException;
use Magento\Quote\Model\Quote\Address\RateRequest;

class Carrier
{


    /**
     * @var \Magento\Catalog\Api\ProductRepositoryInterface
     */
    private $productRepository;

    /**
     * @var \Magento\Quote\Model\Quote\Address\RateResult\ErrorFactory
     */
    private $rateErrorFactory;

    /**
     * @var string
     */
    protected $_code = 'flatrate';
    /**
     * @var string
     */
     protected $_isFixed = true;

    /**
     * @var \Magento\Shipping\Model\Rate\ResultFactory
     */
    protected $_rateResultFactory;

    /**
     * @var \Magento\Quote\Model\Quote\Address\RateResult\MethodFactory
     */
    protected $_resultMethodFactory;

    public function __construct(
        \Magento\Shipping\Model\Rate\ResultFactory $rateResultFactory,
        \Magento\Quote\Model\Quote\Address\RateResult\MethodFactory $resultMethodFactory,
        \Magento\Quote\Model\Quote\Address\RateResult\ErrorFactory $rateErrorFactory
    ){
        $this->_rateResultFactory = $rateResultFactory;
        $this->_resultMethodFactory = $resultMethodFactory;     
        $this->rateErrorFactory = $rateErrorFactory;
      
    }        
    public function afterCollectRates(
         $subject,
        $collectRatesResult  
    ) {
		 $result = $collectRatesResult;

        /** @var \Magento\Quote\Model\Quote\Address\RateResult\Method $method */
        $method = $this->_resultMethodFactory->create();
        $method->setCarrier('shipping');
        $method->setCarrierTitle('Title');
        $method->setMethod('shipping');
        $method->setMethodTitle('Method Title');

        $amount = 100;
        $method->setPrice($amount);
        $method->setCost($amount);

        $result->append($method);

        return $collectRatesResult;
    }
     
}