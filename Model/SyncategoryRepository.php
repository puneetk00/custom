<?php


namespace Synapse\Custom\Model;

use Magento\Framework\Api\ExtensionAttribute\JoinProcessorInterface;
use Synapse\Custom\Api\Data\SyncategoryInterfaceFactory;
use Magento\Framework\Exception\CouldNotSaveException;
use Synapse\Custom\Model\ResourceModel\Syncategory\CollectionFactory as SyncategoryCollectionFactory;
use Magento\Store\Model\StoreManagerInterface;
use Magento\Framework\Api\DataObjectHelper;
use Magento\Framework\Api\SearchCriteria\CollectionProcessorInterface;
use Synapse\Custom\Api\SyncategoryRepositoryInterface;
use Magento\Framework\Exception\CouldNotDeleteException;
use Magento\Framework\Reflection\DataObjectProcessor;
use Magento\Framework\Api\ExtensibleDataObjectConverter;
use Synapse\Custom\Model\ResourceModel\Syncategory as ResourceSyncategory;
use Magento\Framework\Exception\NoSuchEntityException;
use Synapse\Custom\Api\Data\SyncategorySearchResultsInterfaceFactory;

class SyncategoryRepository implements SyncategoryRepositoryInterface
{

    protected $dataObjectHelper;

    private $storeManager;

    protected $syncategoryFactory;

    protected $searchResultsFactory;

    protected $dataObjectProcessor;

    protected $syncategoryCollectionFactory;

    protected $extensionAttributesJoinProcessor;

    protected $dataSyncategoryFactory;

    protected $resource;

    private $collectionProcessor;

    protected $extensibleDataObjectConverter;

    /**
     * @param ResourceSyncategory $resource
     * @param SyncategoryFactory $syncategoryFactory
     * @param SyncategoryInterfaceFactory $dataSyncategoryFactory
     * @param SyncategoryCollectionFactory $syncategoryCollectionFactory
     * @param SyncategorySearchResultsInterfaceFactory $searchResultsFactory
     * @param DataObjectHelper $dataObjectHelper
     * @param DataObjectProcessor $dataObjectProcessor
     * @param StoreManagerInterface $storeManager
     * @param CollectionProcessorInterface $collectionProcessor
     * @param JoinProcessorInterface $extensionAttributesJoinProcessor
     * @param ExtensibleDataObjectConverter $extensibleDataObjectConverter
     */
    public function __construct(
        ResourceSyncategory $resource,
        SyncategoryFactory $syncategoryFactory,
        SyncategoryInterfaceFactory $dataSyncategoryFactory,
        SyncategoryCollectionFactory $syncategoryCollectionFactory,
        SyncategorySearchResultsInterfaceFactory $searchResultsFactory,
        DataObjectHelper $dataObjectHelper,
        DataObjectProcessor $dataObjectProcessor,
        StoreManagerInterface $storeManager,
        CollectionProcessorInterface $collectionProcessor,
        JoinProcessorInterface $extensionAttributesJoinProcessor,
        ExtensibleDataObjectConverter $extensibleDataObjectConverter
    ) {
        $this->resource = $resource;
        $this->syncategoryFactory = $syncategoryFactory;
        $this->syncategoryCollectionFactory = $syncategoryCollectionFactory;
        $this->searchResultsFactory = $searchResultsFactory;
        $this->dataObjectHelper = $dataObjectHelper;
        $this->dataSyncategoryFactory = $dataSyncategoryFactory;
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
        \Synapse\Custom\Api\Data\SyncategoryInterface $syncategory
    ) {
        /* if (empty($syncategory->getStoreId())) {
            $storeId = $this->storeManager->getStore()->getId();
            $syncategory->setStoreId($storeId);
        } */
        
        $syncategoryData = $this->extensibleDataObjectConverter->toNestedArray(
            $syncategory,
            [],
            \Synapse\Custom\Api\Data\SyncategoryInterface::class
        );
        
        $syncategoryModel = $this->syncategoryFactory->create()->setData($syncategoryData);
        
        try {
            $this->resource->save($syncategoryModel);
        } catch (\Exception $exception) {
            throw new CouldNotSaveException(__(
                'Could not save the syncategory: %1',
                $exception->getMessage()
            ));
        }
        return $syncategoryModel->getDataModel();
    }

    /**
     * {@inheritdoc}
     */
    public function getById($syncategoryId)
    {
        $syncategory = $this->syncategoryFactory->create();
        $this->resource->load($syncategory, $syncategoryId);
        if (!$syncategory->getId()) {
            throw new NoSuchEntityException(__('syncategory with id "%1" does not exist.', $syncategoryId));
        }
        return $syncategory->getDataModel();
    }

    /**
     * {@inheritdoc}
     */
    public function getList(
        \Magento\Framework\Api\SearchCriteriaInterface $criteria
    ) {
        $collection = $this->syncategoryCollectionFactory->create();
        
        $this->extensionAttributesJoinProcessor->process(
            $collection,
            \Synapse\Custom\Api\Data\SyncategoryInterface::class
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
        \Synapse\Custom\Api\Data\SyncategoryInterface $syncategory
    ) {
        try {
            $syncategoryModel = $this->syncategoryFactory->create();
            $this->resource->load($syncategoryModel, $syncategory->getSyncategoryId());
            $this->resource->delete($syncategoryModel);
        } catch (\Exception $exception) {
            throw new CouldNotDeleteException(__(
                'Could not delete the syncategory: %1',
                $exception->getMessage()
            ));
        }
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function deleteById($syncategoryId)
    {
        return $this->delete($this->getById($syncategoryId));
    }
}
