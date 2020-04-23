<?php


namespace Synapse\Custom\Controller\Adminhtml\Syntemplates;

use Magento\Framework\Exception\LocalizedException;

class Save extends \Magento\Backend\App\Action
{

    protected $dataPersistor;

    /**
     * @param \Magento\Backend\App\Action\Context $context
     * @param \Magento\Framework\App\Request\DataPersistorInterface $dataPersistor
     */
    public function __construct(
        \Magento\Backend\App\Action\Context $context,
        \Magento\Framework\App\Request\DataPersistorInterface $dataPersistor
    ) {
        $this->dataPersistor = $dataPersistor;
        parent::__construct($context);
    }

    /**
     * Save action
     *
     * @return \Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        /** @var \Magento\Backend\Model\View\Result\Redirect $resultRedirect */
        $resultRedirect = $this->resultRedirectFactory->create();
        $data = $this->getRequest()->getPostValue();
        if ($data) {
			 
			if (isset($data['image'][0]['name']) && isset($data['image'][0]['tmp_name'])) {
                $data['image'] =$data['image'][0]['name'];
                $this->imageUploader = \Magento\Framework\App\ObjectManager::getInstance()->get(
                'Synapse\Custom\HelloWorldImageUpload'
            );
                $this->imageUploader->moveFileFromTmp($data['image']);
            } elseif (isset($data['image'][0]['image']) && !isset($data['image'][0]['tmp_name'])) {
                $data['image'] = $data['image'][0]['image'];
            } 
			
			
            $id = $this->getRequest()->getParam('syntemplates_id');
        
            $model = $this->_objectManager->create(\Synapse\Custom\Model\Syntemplates::class)->load($id);
            if (!$model->getId() && $id) {
                $this->messageManager->addErrorMessage(__('This Template no longer exists.'));
                return $resultRedirect->setPath('*/*/');
            }
        
            $model->setData($data);
        
            try {
                $model->save();
                $this->messageManager->addSuccessMessage(__('You saved the Template.'));
                $this->dataPersistor->clear('synapse_custom_syntemplates');
        
                if ($this->getRequest()->getParam('back')) {
                    return $resultRedirect->setPath('*/*/edit', ['syntemplates_id' => $model->getId()]);
                }
                return $resultRedirect->setPath('*/*/');
            } catch (LocalizedException $e) {
                $this->messageManager->addErrorMessage($e->getMessage());
            } catch (\Exception $e) {
                $this->messageManager->addExceptionMessage($e, __('Something went wrong while saving the Template.'));
            }
        
            $this->dataPersistor->set('synapse_custom_syntemplates', $data);
            return $resultRedirect->setPath('*/*/edit', ['syntemplates_id' => $this->getRequest()->getParam('syntemplates_id')]);
        }
        return $resultRedirect->setPath('*/*/');
    }
}
