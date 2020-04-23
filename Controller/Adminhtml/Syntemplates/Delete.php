<?php


namespace Synapse\Custom\Controller\Adminhtml\Syntemplates;

class Delete extends \Synapse\Custom\Controller\Adminhtml\Syntemplates
{

    /**
     * Delete action
     *
     * @return \Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        /** @var \Magento\Backend\Model\View\Result\Redirect $resultRedirect */
        $resultRedirect = $this->resultRedirectFactory->create();
        // check if we know what should be deleted
        $id = $this->getRequest()->getParam('syntemplates_id');
        if ($id) {
            try {
                // init model and delete
                $model = $this->_objectManager->create(\Synapse\Custom\Model\Syntemplates::class);
                $model->load($id);
                $model->delete();
                // display success message
                $this->messageManager->addSuccessMessage(__('You deleted the Syntemplates.'));
                // go to grid
                return $resultRedirect->setPath('*/*/');
            } catch (\Exception $e) {
                // display error message
                $this->messageManager->addErrorMessage($e->getMessage());
                // go back to edit form
                return $resultRedirect->setPath('*/*/edit', ['syntemplates_id' => $id]);
            }
        }
        // display error message
        $this->messageManager->addErrorMessage(__('We can\'t find a Syntemplates to delete.'));
        // go to grid
        return $resultRedirect->setPath('*/*/');
    }
}
