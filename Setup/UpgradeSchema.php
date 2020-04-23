<?php


namespace Synapse\Custom\Setup;

use Magento\Framework\Setup\UpgradeSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;

class UpgradeSchema implements UpgradeSchemaInterface
{

    /**
     * {@inheritdoc}
     */
    public function upgrade(
        SchemaSetupInterface $setup,
        ModuleContextInterface $context
    ) {
        if (version_compare($context->getVersion(), "1.0.5", "<")) {
           
        //Your install script

        $table_synapse_custom_syncategory = $setup->getConnection()->newTable($setup->getTable('synapse_custom_syncategory'));

        $table_synapse_custom_syncategory->addColumn(
            'syncategory_id',
            \Magento\Framework\DB\Ddl\Table::TYPE_INTEGER,
            null,
            ['identity' => true,'nullable' => false,'primary' => true,'unsigned' => true,],
            'Entity ID'
        );

        $table_synapse_custom_syncategory->addColumn(
            'name',
            \Magento\Framework\DB\Ddl\Table::TYPE_TEXT,
            255,
            [],
            'name'
        );

        $table_synapse_custom_syncategory->addColumn(
            'parent',
            \Magento\Framework\DB\Ddl\Table::TYPE_INTEGER,
            null,
            [],
            'parent'
        );

        $table_synapse_custom_syncategory->addColumn(
            'created_at',
            \Magento\Framework\DB\Ddl\Table::TYPE_TIMESTAMP,
            null,
            [],
            'created_at'
        );

        $table_synapse_custom_syncategory->addColumn(
            'updated_at',
            \Magento\Framework\DB\Ddl\Table::TYPE_TIMESTAMP,
            null,
            [],
            'updated_at'
        );

        $setup->getConnection()->createTable($table_synapse_custom_syncategory);
        }
		
		 if (version_compare($context->getVersion(), "1.0.6", "<")){
			 $table_synapse_custom_syntemplates = $setup->getConnection()->newTable($setup->getTable('synapse_custom_syntemplates'));

        $table_synapse_custom_syntemplates->addColumn(
            'syntemplates_id',
            \Magento\Framework\DB\Ddl\Table::TYPE_INTEGER,
            null,
            ['identity' => true,'nullable' => false,'primary' => true,'unsigned' => true,],
            'Entity ID'
        );

        $table_synapse_custom_syntemplates->addColumn(
            'name',
            \Magento\Framework\DB\Ddl\Table::TYPE_TEXT,
            255,
            [],
            'name'
        );

        $table_synapse_custom_syntemplates->addColumn(
            'category',
            \Magento\Framework\DB\Ddl\Table::TYPE_TEXT,
            255,
            [],
            'category'
        );

        $table_synapse_custom_syntemplates->addColumn(
            'image',
            \Magento\Framework\DB\Ddl\Table::TYPE_TEXT,
            255,
            [],
            'image'
        );
		 $table_synapse_custom_syntemplates->addColumn(
            'json',
            \Magento\Framework\DB\Ddl\Table::TYPE_TEXT,
            null,
            [],
            'json'
        );

        $setup->getConnection()->createTable($table_synapse_custom_syntemplates);
		}
    }
}
