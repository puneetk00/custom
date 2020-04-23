<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Synapse\Custom\Ui\Component\Form;

use Magento\Framework\Data\OptionSourceInterface;
use Synapse\Custom\Model\ResourceModel\Syncategory\CollectionFactory as CategoryCollectionFactory;
use Magento\Framework\App\RequestInterface;
use Synapse\Custom\Model\Syncategory as CategoryModel;

/**
 * Options tree for "Categories" field
 */
class Categories implements OptionSourceInterface
{
    /**
     * @var \Magento\Catalog\Model\ResourceModel\Category\CollectionFactory
     */
    protected $categoryCollectionFactory;

    /**
     * @var RequestInterface
     */
    protected $request;

    /**
     * @var array
     */
    protected $categoriesTree;

    /**
     * @param CategoryCollectionFactory $categoryCollectionFactory
     * @param RequestInterface $request
     */
    public function __construct(
        CategoryCollectionFactory $categoryCollectionFactory,
        RequestInterface $request
    ) {
        $this->categoryCollectionFactory = $categoryCollectionFactory;
        $this->request = $request;
    }

    /**
     * {@inheritdoc}
     */
    public function toOptionArray()
    {
        return $this->getCategoriesTree();
    }

    /**
     * Retrieve categories tree
     *
     * @return array
     */
    protected function getCategoriesTree()
    {
        if ($this->categoriesTree === null) {
			$categoryById = [];
			$collection = $this->categoryCollectionFactory->create();
			$array_cat = [];
			$parents_cat = [];
			foreach ($collection as $category) {
				$array_cat[$category->getId()] = ['parent_id'=>$category->getParent(),'name'=>$category->getName()];
				$parents_cat[$category->getParent()][] = $category->getId();
			}
			
			$make_array = [];
			$optgroup_array = [];
			foreach($array_cat as $cat_id=>$cat_details){
				$make_array[$cat_id] = ['value'=>$cat_id,'is_active'=>1,'label'=>$cat_details['name']];
			}
				
		 
		
			foreach($parents_cat as $id=>$catidarr){
				foreach($catidarr as $val){
					 
					 if(array_key_exists($id,$make_array)){
						$make_array[$id]['optgroup'][] = $make_array[$val];
						unset($make_array[$val]); 
					 }
					
				}
			}
			
			$this->categoriesTree = $make_array;
			}
	 
        return $this->categoriesTree;
    }
}
