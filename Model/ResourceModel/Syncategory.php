<?php


namespace Synapse\Custom\Model\ResourceModel;

class Syncategory extends \Magento\Framework\Model\ResourceModel\Db\AbstractDb
{

    /**
     * Define resource model
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init('synapse_custom_syncategory', 'syncategory_id');
    }
}
