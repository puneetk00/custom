<?php

namespace Synapse\Custom\Block\Adminhtml\Product\Edit\Tab;
use Magento\Backend\Block\Template\Context;
use Magento\Framework\Registry;

class Company extends \Magento\Framework\View\Element\Template
{
    protected $_template = 'catalog/product/company.phtml';

    protected $_coreRegistry = null;

    public function __construct(
        Context $context,
        Registry $registry,
        array $data = []
    )
    {
        $this->_coreRegistry = $registry;
        parent::__construct($context, $data);
    }

    public function getProduct()
    {
        return $this->_coreRegistry->registry('current_product');
    }
}