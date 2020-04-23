<?php


namespace Synapse\Custom\Model;

use Synapse\Custom\Api\Data\SyntemplatesInterface;
use Synapse\Custom\Api\Data\SyntemplatesInterfaceFactory;
use Magento\Framework\Api\DataObjectHelper;

class Syntemplates extends \Magento\Framework\Model\AbstractModel
{

    protected $dataObjectHelper;

    protected $syntemplatesDataFactory;

    protected $_eventPrefix = 'synapse_custom_syntemplates';

    /**
     * @param \Magento\Framework\Model\Context $context
     * @param \Magento\Framework\Registry $registry
     * @param SyntemplatesInterfaceFactory $syntemplatesDataFactory
     * @param DataObjectHelper $dataObjectHelper
     * @param \Synapse\Custom\Model\ResourceModel\Syntemplates $resource
     * @param \Synapse\Custom\Model\ResourceModel\Syntemplates\Collection $resourceCollection
     * @param array $data
     */
    public function __construct(
        \Magento\Framework\Model\Context $context,
        \Magento\Framework\Registry $registry,
        SyntemplatesInterfaceFactory $syntemplatesDataFactory,
        DataObjectHelper $dataObjectHelper,
        \Synapse\Custom\Model\ResourceModel\Syntemplates $resource,
        \Synapse\Custom\Model\ResourceModel\Syntemplates\Collection $resourceCollection,
        array $data = []
    ) {
        $this->syntemplatesDataFactory = $syntemplatesDataFactory;
        $this->dataObjectHelper = $dataObjectHelper;
        parent::__construct($context, $registry, $resource, $resourceCollection, $data);
    }

    /**
     * Retrieve syntemplates model with syntemplates data
     * @return SyntemplatesInterface
     */
    public function getDataModel()
    {
        $syntemplatesData = $this->getData();
        
        $syntemplatesDataObject = $this->syntemplatesDataFactory->create();
        $this->dataObjectHelper->populateWithArray(
            $syntemplatesDataObject,
            $syntemplatesData,
            SyntemplatesInterface::class
        );
        
        return $syntemplatesDataObject;
    }
}
