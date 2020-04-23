<?php
 
namespace Synapse\Custom\Plugin\Customer\Model\Address

 
class AbstractAddress
{  
    public function aroundValidate(
    \Magento\Customer\Model\Address\AbstractAddress $subject, callable $proceed)
    {

        $errors = [];
        if (!\Zend_Validate::is($subject->getFirstname(), 'NotEmpty')) {
            $errors[] = __('%fieldName is a required field.', ['fieldName' => 'firstname']);
        }

        if (!\Zend_Validate::is($this->getLastname(), 'NotEmpty')) {
            $errors[] = __('%fieldName is a required field 55.', ['fieldName' => 'lastname']);
        } 

        if (!\Zend_Validate::is($subject->getStreetLine(1), 'NotEmpty')) {
            $errors[] = __('%fieldName is a required field.', ['fieldName' => 'street']);
        }

        if (!\Zend_Validate::is($subject->getCity(), 'NotEmpty')) {
            $errors[] = __('%fieldName is a required field.', ['fieldName' => 'city']);
        }

        if ($this->isTelephoneRequired()) {
            if (!\Zend_Validate::is($subject->getTelephone(), 'NotEmpty')) {
                $errors[] = __('%fieldName is a required field.', ['fieldName' => 'telephone']);
            }
        }

        if ($this->isFaxRequired()) {
            if (!\Zend_Validate::is($subject->getFax(), 'NotEmpty')) {
                $errors[] = __('%fieldName is a required field.', ['fieldName' => 'fax']);
            }
        }

        if ($this->isCompanyRequired()) {
            if (!\Zend_Validate::is($subject->getCompany(), 'NotEmpty')) {
                $errors[] = __('%fieldName is a required field.', ['fieldName' => 'company']);
            }
        }

        if (empty($errors) || $this->getShouldIgnoreValidation()) {
            return true;
        }
        return $errors;
    }

}

?>