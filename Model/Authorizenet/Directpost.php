<?php

namespace Synapse\Custom\Model\Authorizenet;

class Directpost extends \Magento\Authorizenet\Model\Directpost
{
 	public function aroundCheckTransId(\Magento\Authorizenet\Model\Directpost $subject,callable $proceed)
    {
    	

        if (!$subject->getResponse()->getXTestRequest() && !$subject->getResponse()->getXTransId()) {
            throw new \Magento\Framework\Exception\LocalizedException(
                __('Please enter a transaction ID to authorize this payment.')
            );
        }
        return true;
    } 
}