<?php


namespace Synapse\Custom\Model;

use Synapse\Custom\Model\ResourceModel\Syntemplates\CollectionFactory as SyntemplatesCollectionFactory;
use Magento\Framework\Exception\CouldNotSaveException;
use Magento\Framework\Api\ExtensionAttribute\JoinProcessorInterface;
use Magento\Store\Model\StoreManagerInterface;
use Synapse\Custom\Api\Data\SyntemplatesInterfaceFactory;
use Magento\Framework\Api\DataObjectHelper;
use Magento\Framework\Api\SearchCriteria\CollectionProcessorInterface;
use Magento\Framework\Exception\CouldNotDeleteException;
use Magento\Framework\Reflection\DataObjectProcessor;
use Magento\Framework\Api\ExtensibleDataObjectConverter;
use Synapse\Custom\Api\Data\SyntemplatesSearchResultsInterfaceFactory;
use Synapse\Custom\Api\SyntemplatesRepositoryInterface;
use Synapse\Custom\Model\ResourceModel\Syntemplates as ResourceSyntemplates;
use Magento\Framework\Exception\NoSuchEntityException;

class SyntemplatesRepository implements SyntemplatesRepositoryInterface
{

    protected $dataObjectHelper;

    private $storeManager;

    protected $dataSyntemplatesFactory;

    protected $searchResultsFactory;

    protected $dataObjectProcessor;

    protected $extensionAttributesJoinProcessor;

    private $collectionProcessor;

    protected $extensibleDataObjectConverter;
    protected $resource;

    protected $syntemplatesFactory;

    protected $syntemplatesCollectionFactory;


    /**
     * @param ResourceSyntemplates $resource
     * @param SyntemplatesFactory $syntemplatesFactory
     * @param SyntemplatesInterfaceFactory $dataSyntemplatesFactory
     * @param SyntemplatesCollectionFactory $syntemplatesCollectionFactory
     * @param SyntemplatesSearchResultsInterfaceFactory $searchResultsFactory
     * @param DataObjectHelper $dataObjectHelper
     * @param DataObjectProcessor $dataObjectProcessor
     * @param StoreManagerInterface $storeManager
     * @param CollectionProcessorInterface $collectionProcessor
     * @param JoinProcessorInterface $extensionAttributesJoinProcessor
     * @param ExtensibleDataObjectConverter $extensibleDataObjectConverter
     */
    public function __construct(
        ResourceSyntemplates $resource,
        SyntemplatesFactory $syntemplatesFactory,
        SyntemplatesInterfaceFactory $dataSyntemplatesFactory,
        SyntemplatesCollectionFactory $syntemplatesCollectionFactory,
        SyntemplatesSearchResultsInterfaceFactory $searchResultsFactory,
        DataObjectHelper $dataObjectHelper,
        DataObjectProcessor $dataObjectProcessor,
        StoreManagerInterface $storeManager,
        CollectionProcessorInterface $collectionProcessor,
        JoinProcessorInterface $extensionAttributesJoinProcessor,
        ExtensibleDataObjectConverter $extensibleDataObjectConverter
    ) {
        $this->resource = $resource;
        $this->syntemplatesFactory = $syntemplatesFactory;
        $this->syntemplatesCollectionFactory = $syntemplatesCollectionFactory;
        $this->searchResultsFactory = $searchResultsFactory;
        $this->dataObjectHelper = $dataObjectHelper;
        $this->dataSyntemplatesFactory = $dataSyntemplatesFactory;
        $this->dataObjectProcessor = $dataObjectProcessor;
        $this->storeManager = $storeManager;
        $this->collectionProcessor = $collectionProcessor;
        $this->extensionAttributesJoinProcessor = $extensionAttributesJoinProcessor;
        $this->extensibleDataObjectConverter = $extensibleDataObjectConverter;
    }

    /**
     * {@inheritdoc}
     */
    public function save(
        \Synapse\Custom\Api\Data\SyntemplatesInterface $syntemplates
    ) {
        /* if (empty($syntemplates->getStoreId())) {
            $storeId = $this->storeManager->getStore()->getId();
            $syntemplates->setStoreId($storeId);
        } */
        
        $syntemplatesData = $this->extensibleDataObjectConverter->toNestedArray(
            $syntemplates,
            [],
            \Synapse\Custom\Api\Data\SyntemplatesInterface::class
        );
        
        $syntemplatesModel = $this->syntemplatesFactory->create()->setData($syntemplatesData);
        
        try {
            $this->resource->save($syntemplatesModel);
        } catch (\Exception $exception) {
            throw new CouldNotSaveException(__(
                'Could not save the syntemplates: %1',
                $exception->getMessage()
            ));
        }
        return $syntemplatesModel->getDataModel();
    }

    /**
     * {@inheritdoc}
     */
    public function getById($syntemplatesId)
    {
        $syntemplates = $this->syntemplatesFactory->create();
        $this->resource->load($syntemplates, $syntemplatesId);
        if (!$syntemplates->getId()) {
            throw new NoSuchEntityException(__('syntemplates with id "%1" does not exist.', $syntemplatesId));
        }
        return $syntemplates->getDataModel();
    }

    /**
     * {@inheritdoc}
     */
    public function getList(
        \Magento\Framework\Api\SearchCriteriaInterface $criteria
    ) {
        $collection = $this->syntemplatesCollectionFactory->create();
        
        $this->extensionAttributesJoinProcessor->process(
            $collection,
            \Synapse\Custom\Api\Data\SyntemplatesInterface::class
        );
        
        $this->collectionProcessor->process($criteria, $collection);
        
        $searchResults = $this->searchResultsFactory->create();
        $searchResults->setSearchCriteria($criteria);
        
        $items = [];
        foreach ($collection as $model) {
            $items[] = $model->getDataModel();
        }
        
        $searchResults->setItems($items);
        $searchResults->setTotalCount($collection->getSize());
        return $searchResults;
    }

    /**
     * {@inheritdoc}
     */
    public function delete(
        \Synapse\Custom\Api\Data\SyntemplatesInterface $syntemplates
    ) {
        try {
            $syntemplatesModel = $this->syntemplatesFactory->create();
            $this->resource->load($syntemplatesModel, $syntemplates->getSyntemplatesId());
            $this->resource->delete($syntemplatesModel);
        } catch (\Exception $exception) {
            throw new CouldNotDeleteException(__(
                'Could not delete the syntemplates: %1',
                $exception->getMessage()
            ));
        }
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function deleteById($syntemplatesId)
    {
        return $this->delete($this->getById($syntemplatesId));
    }
}
