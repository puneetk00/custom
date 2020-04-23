<?php


namespace Synapse\Custom\Model\Syntemplates;

use Magento\Framework\App\Request\DataPersistorInterface;
use Synapse\Custom\Model\ResourceModel\Syntemplates\CollectionFactory;

class DataProvider extends \Magento\Ui\DataProvider\AbstractDataProvider
{

    protected $collection;

    protected $dataPersistor;

    protected $loadedData;

    /**
     * Constructor
     *
     * @param string $name
     * @param string $primaryFieldName
     * @param string $requestFieldName
     * @param CollectionFactory $collectionFactory
     * @param DataPersistorInterface $dataPersistor
     * @param array $meta
     * @param array $data
     */
    public function __construct(
        $name,
        $primaryFieldName,
        $requestFieldName,
        CollectionFactory $collectionFactory,
        DataPersistorInterface $dataPersistor,
		\Magento\Store\Model\StoreManagerInterface $storeManager,
        array $meta = [],
        array $data = []
    ) {
        $this->collection = $collectionFactory->create();
        $this->dataPersistor = $dataPersistor;
		$this->_storeManager=$storeManager;
        parent::__construct($name, $primaryFieldName, $requestFieldName, $meta, $data);
    }

    /**
     * Get data
     *
     * @return array
     */
    public function getData()
    {
        if (isset($this->loadedData)) {
            return $this->loadedData;
        }
		$baseurl =  $this->_storeManager->getStore()->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA);
        $items = $this->collection->getItems();
        foreach ($items as $model) {
			
			$temp = $model->getData();
			 if($temp['image']):
            $img = [];
            $img[0]['image'] = $temp['image'];
            $img[0]['url'] = $baseurl.'syncat/image/'.$temp['image'];
			//$img[0]['url'] =  'http://us.oxtools.eadev.co/pub/media/billing/image/b/a/banner1_13.png';
            $temp['image'] = $img;
            endif;
			 $data = $this->dataPersistor->get('synapse_custom_syntemplates');
				if (!empty($data)) {
					$model = $this->collection->getNewEmptyItem();
					$model->setData($data);
					$this->loadedData[$model->getId()] = $model->getData();
					$this->dataPersistor->clear('synapse_custom_syntemplates');
				}else{
					if($items):
					if ($model->getData('image') != null) {
						
						$t2[$model->getId()] = $temp;    
						 
						return $t2;
					} else {                
					   return $this->loadedData;
					}
					endif;
				}
            $this->loadedData[$model->getId()] = $model->getData();
        }
        //$data = $this->dataPersistor->get('synapse_custom_syntemplates');
        
        // if (!empty($data)) {
            // $model = $this->collection->getNewEmptyItem();
            // $model->setData($data);
            // $this->loadedData[$model->getId()] = $model->getData();
            // $this->dataPersistor->clear('synapse_custom_syntemplates');
        // }
        
        return $this->loadedData;
    }
}
