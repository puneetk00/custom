<?php
/**
 * Copyright � Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Synapse\Custom\Plugin\Customer\Controller\Account;

use Magento\Customer\Model\Session;
use Magento\Framework\Data\Form\FormKey\Validator;
use Magento\Customer\Api\CustomerRepositoryInterface;
use  Magento\Framework\Message\ManagerInterface;
use Magento\Framework\App\Response\Http as ResponseHttp;
class LoginPost
{
	const company_group_id = 3;
	const company_employee_group_id = 2;
    /**
     * @var Session
     */
    protected $session;
    /** @var Validator */
    protected $formKeyValidator;
    /** @var CustomerRepositoryInterface */
    protected $customerRepositoryInterface;
    /** @var ManagerInterface **/
    protected $messageManager;
    /** @var Http **/
    protected $responseHttp;
    protected $currentCustomer;
    protected $customerFactory;
    /**
     * @var \Magento\Customer\Api\AccountManagementInterface
     */
    protected $customerAccountManagement;
            
    public function __construct(
        Session $customerSession,
        Validator $formKeyValidator,
        CustomerRepositoryInterface $customerRepositoryInterface,
        ManagerInterface $messageManager,
        ResponseHttp $responseHttp,
        \Magento\Customer\Model\CustomerFactory $customerFactory,
        \Magento\Customer\Api\AccountManagementInterface $customerAccountManagement
    )
    {
        $this->session = $customerSession;
        $this->formKeyValidator = $formKeyValidator;
        $this->customerRepositoryInterface = $customerRepositoryInterface;
        $this->messageManager = $messageManager;
        $this->responseHttp = $responseHttp;
        $this->customerFactory = $customerFactory;
        $this->customerAccountManagement = $customerAccountManagement;
    }
    public function aroundExecute(\Magento\Customer\Controller\Account\LoginPost $loginPost, \Closure $proceed)
    {
		if ($loginPost->getRequest()->isPost()) {
            $login = $loginPost->getRequest()->getPost('login');
            if (!empty($login['username']) && !empty($login['password'])) {
                try {
                    $customer = $this->customerAccountManagement->authenticate($login['username'], $login['password']);
                    if ($customer->getGroupId()==self::company_group_id && $this->isAccountNotApproved($customer)) {         
							$this->messageManager->addErrorMessage(__('Your account is not approved. Kindly contact website admin for assitance.'));
                            $this->responseHttp->setRedirect('customer/account/login');
                            //@todo:: redirect to last visited url
                    } elseif($customer->getGroupId()==self::company_employee_group_id && $this->isAccountNotApproved($customer)){
						$this->messageManager->addErrorMessage(__('Your account is not approved. Kindly contact website admin or company owner for assitance.'));
						$this->responseHttp->setRedirect('customer/account/login');
					} else {
                            return $proceed();
                    }
                   
                }
                catch (\Exception $e)
                {
                    $message = __("Invalid User credentials.");
                    $this->messageManager->addError($message);
                    $this->session->setUsername($login['username']);
                    $this->responseHttp->setRedirect('customer/account/login');
                }
            }
            else {
                // call the original execute function
                return $proceed();
            }
        }
        else {
            // call the original execute function
            return $proceed();
        }
    }
    /**
     * @param $email
     * @return \Magento\Customer\Api\Data\CustomerInterface
     */
    public function getCustomer($email)
    {
        $customer = $this->customerFactory->create()->loadbyEmail($email,1);
        $this->customerFactory->load($customer->getId());
        
        $this->currentCustomer = $this->customerRepositoryInterface->get($email,1);
        return $this->currentCustomer;
    }
    /**
     * Check if customer is a vendor and account is approved
     * @return bool
     */
    public function isAccountNotApproved($customer)
    {
        $id = $customer->getId();
		
        $customer = $this->customerRepositoryInterface->getById($id);
		 
        $isApprovedAccount =  '';
		if($customer->getCustomAttribute('approve_account')){
				$isApprovedAccount = $customer->getCustomAttribute('approve_account')->getValue();
				if($isApprovedAccount)
				{
					return false;
				}
			
		}
	    
	   
        
        return true;
    }
}