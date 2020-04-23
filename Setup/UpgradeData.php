<?php
	namespace Synapse\Custom\Setup;
	use Magento\Framework\Module\Setup\Migration;
	use Magento\Framework\Setup\UpgradeDataInterface;
	use Magento\Framework\Setup\ModuleContextInterface;
	use Magento\Framework\Setup\ModuleDataSetupInterface;
	use Magento\Catalog\Setup\CategorySetupFactory;
	
	use Magento\Eav\Setup\EavSetupFactory;

	use Magento\Customer\Setup\CustomerSetupFactory;


	class UpgradeData implements UpgradeDataInterface {
	/**
	* Category setup factory
	*
	* @var CategorySetupFactory
	*/
	private $categorySetupFactory;
	
	protected $logger;
	
	public function __construct(
		CategorySetupFactory $categorySetupFactory,
		\Psr\Log\LoggerInterface $logger,
		 EavSetupFactory $eavSetupFactory,
        CustomerSetupFactory $customerSetupFactory
		) {
		$this->eavSetupFactory = $eavSetupFactory;

        $this->customerSetupFactory = $customerSetupFactory;
		
        $this->categorySetupFactory = $categorySetupFactory;
		$this->logger = $logger;
    }

	/**
	* {@inheritdoc}
	* @SuppressWarnings(PHPMD.ExcessiveMethodLength)
	*/
	public function upgrade(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
	{
		if (version_compare($context->getVersion(), '1.0.2', '<=')) {
		$installer = $setup;
		$installer->startSetup();
		$categorySetup = $this->categorySetupFactory->create(['setup' => $setup]);
		$entityTypeId = $categorySetup->getEntityTypeId(\Magento\Catalog\Model\Category::ENTITY);
		$attributeSetId = $categorySetup->getDefaultAttributeSetId($entityTypeId);
		$categorySetup->removeAttribute(
		\Magento\Catalog\Model\Category::ENTITY, 'allow_for_guest');
		$categorySetup->addAttribute(
		\Magento\Catalog\Model\Category::ENTITY, 'allow_for_guest', [
			'type' => 'int',
			'label' => 'Allow For Guest',
			'input' => 'boolean',
			'source' => 'Magento\Eav\Model\Entity\Attribute\Source\Boolean',
			'required' => false,
			'default'  => '0',
			'sort_order' => 100,
			'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
			'group' => 'Display Settings',
			]
		);
		$installer->endSetup();
		}
		
		if (version_compare($context->getVersion(), '1.0.4') < 0) { 

		$setup->startSetup();
        $eavSetup = $this->eavSetupFactory->create(['setup' => $setup]);
        $customerSetup = $this->customerSetupFactory->create(['setup' => $setup]);
 
            $allowroundedcorner = 'flatcharges';
            
			$customerSetup -> addAttribute(
				\Magento\Customer\Model\Customer::ENTITY,
             $allowroundedcorner,
				[
				'label' => 'Flat Charges',
				'system' => 0,
				'position' => 100,
				'sort_order' =>100,
				'visible' =>  true,
				'note' => '',
				'type' => 'varchar',
				'input' => 'text'
				]
            );
			
            // show the attribute in the following forms

            $attribute = $customerSetup

                            ->getEavConfig()

                            ->getAttribute(

                                \Magento\Customer\Model\Customer::ENTITY, 

                                $allowroundedcorner

                            )

                            ->addData(

                                ['used_in_forms' => [

                                    'adminhtml_customer'

                                ]

                            ]);
            $attribute->save();
        }
	}
}