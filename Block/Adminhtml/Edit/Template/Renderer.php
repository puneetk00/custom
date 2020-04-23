<?php namespace Synapse\Custom\Block\Adminhtml\Edit\Template;
 
class Renderer extends \Magento\Backend\Block\Template
{
    /**
     * Block template.
     *
     * @var string
     */
    protected $_template = 'renderer.phtml';
 
    /**
     * AssignProducts constructor.
     *
     * @param \Magento\Backend\Block\Template\Context  $context
     * @param array                                    $data
     */
    public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        array $data = []
    ) {
        parent::__construct($context, $data);
    }
}