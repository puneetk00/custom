<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Synapse\Custom\Helper;
use Magento\Catalog\Api\CategoryRepositoryInterface;
use Magento\Catalog\Api\ProductRepositoryInterface;

class Product extends \Magento\Catalog\Helper\Product {
	
	protected $_customerSession;
	
	/**
     * @param \Magento\Framework\App\Helper\Context $context
     * @param \Magento\Store\Model\StoreManagerInterface $storeManager
     * @param \Magento\Catalog\Model\Session $catalogSession
     * @param \Magento\Framework\View\Asset\Repository $assetRepo
     * @param \Magento\Framework\Registry $coreRegistry
     * @param \Magento\Catalog\Model\Attribute\Config $attributeConfig
     * @param array $reindexPriceIndexerData
     * @param array $reindexProductCategoryIndexerData
     * @param ProductRepositoryInterface $productRepository
     * @param CategoryRepositoryInterface $categoryRepository
     * @SuppressWarnings(PHPMD.ExcessiveParameterList)
     */
    public function __construct(
        \Magento\Framework\App\Helper\Context $context,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Catalog\Model\Session $catalogSession,
        \Magento\Framework\View\Asset\Repository $assetRepo,
        \Magento\Framework\Registry $coreRegistry,
        \Magento\Catalog\Model\Attribute\Config $attributeConfig,
        $reindexPriceIndexerData,
        $reindexProductCategoryIndexerData,
        ProductRepositoryInterface $productRepository,
        CategoryRepositoryInterface $categoryRepository,
		\Magento\Customer\Model\SessionFactory $customerSession
    ) {
		 $this->_customerSession = $customerSession;
        parent::__construct($context,$storeManager,$catalogSession,$assetRepo,$coreRegistry,$attributeConfig,$reindexPriceIndexerData,$reindexProductCategoryIndexerData,$productRepository,$categoryRepository);
    }
	
	/**
     * Check if a product can be shown
     *
     * @param ModelProduct|int $product
     * @param string $where
     * @return bool
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    public function canShow($product, $where = 'catalog')
    {
        if (is_int($product)) {
            try {
                $product = $this->productRepository->getById($product);
            } catch (NoSuchEntityException $e) {
                return false;
            }
        } else {
            if (!$product->getId()) {
                return false;
            }
        }
		
		// true it with sample Cards
		
		if($product->getCardJson() == '') {
			return $product->isVisibleInCatalog() && $product->isVisibleInSiteVisibility();
			
		}
		
		$customerComapny = $product->getCustomerCompany();
		$customer = $this->_customerSession->create();
		
		if (!$customer->getCustomer()->getId()) {
			return false;
		}
		
		
		$ownerCompany=$customer->getCustomer()->getCompany();
		
		if($customerComapny != $ownerCompany) {
			return false;
		}

        return $product->isVisibleInCatalog() && $product->isVisibleInSiteVisibility();
    }
	
}