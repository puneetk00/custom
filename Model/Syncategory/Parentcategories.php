<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Synapse\Custom\Model\Syncategory;

class Parentcategories implements \Magento\Framework\Data\OptionSourceInterface
{
    /**
     * @var null|array
     */
    protected $options;

    /**
     * @param \Magento\Eav\Model\ResourceModel\Entity\Attribute\Set\CollectionFactory $collectionFactory
     * @param \Magento\Catalog\Model\ResourceModel\Product $product
     */
    public function __construct(
        \Synapse\Custom\Model\ResourceModel\Syncategory\CollectionFactory $collectionFactory
    ) {
        $this->collectionFactory = $collectionFactory;
    }

    /**
     * @return array|null
     */
    public function toOptionArray()
    {
        if (null == $this->options) {
            $collection = $this->collectionFactory->create();
			$collection->addFieldToFilter('parent',array('eq'=>0));
			//$this->options = [['label' => 'aaaaa', 'value' => 'aaaa']];
			//echo $collection->count(); die(__METHOD__);
			$this->options[] = ['label'=>'Parent','value'=>0];
			foreach ($collection as $category) {
                $this->options[] = [
                    'label' => __('%1', $category->getName()),
                    'value' => $category->getId()
                ];
            }
        }
        return $this->options;
    }
}
