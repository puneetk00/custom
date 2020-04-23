<?php


namespace Synapse\Custom\Model;

use Synapse\Custom\Api\Data\SyncategoryInterface;
use Magento\Framework\Api\DataObjectHelper;
use Synapse\Custom\Api\Data\SyncategoryInterfaceFactory;

class Syncategory extends \Magento\Framework\Model\AbstractModel
{

    protected $dataObjectHelper;

    protected $_eventPrefix = 'synapse_custom_syncategory';
    protected $syncategoryDataFactory;


    /**
     * @param \Magento\Framework\Model\Context $context
     * @param \Magento\Framework\Registry $registry
     * @param SyncategoryInterfaceFactory $syncategoryDataFactory
     * @param DataObjectHelper $dataObjectHelper
     * @param \Synapse\Custom\Model\ResourceModel\Syncategory $resource
     * @param \Synapse\Custom\Model\ResourceModel\Syncategory\Collection $resourceCollection
     * @param array $data
     */
    public function __construct(
        \Magento\Framework\Model\Context $context,
        \Magento\Framework\Registry $registry,
        SyncategoryInterfaceFactory $syncategoryDataFactory,
        DataObjectHelper $dataObjectHelper,
        \Synapse\Custom\Model\ResourceModel\Syncategory $resource,
        \Synapse\Custom\Model\ResourceModel\Syncategory\Collection $resourceCollection,
        array $data = []
    ) {
        $this->syncategoryDataFactory = $syncategoryDataFactory;
        $this->dataObjectHelper = $dataObjectHelper;
        parent::__construct($context, $registry, $resource, $resourceCollection, $data);
    }

    /**
     * Retrieve syncategory model with syncategory data
     * @return SyncategoryInterface
     */
    public function getDataModel()
    {
        $syncategoryData = $this->getData();
        
        $syncategoryDataObject = $this->syncategoryDataFactory->create();
        $this->dataObjectHelper->populateWithArray(
            $syncategoryDataObject,
            $syncategoryData,
            SyncategoryInterface::class
        );
        
        return $syncategoryDataObject;
    }
}
