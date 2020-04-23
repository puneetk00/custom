<?php 
namespace Synapse\Custom\Model;

class Purchaseorder extends \Magento\OfflinePayments\Model\Purchaseorder {

    public function validate()
    {
        //parent::validate();

        if (empty($this->getInfoInstance()->getPoNumber())) {
            //throw new LocalizedException(__('Purchase order number is a required field.'));
        }

        return $this;
    }

}