<?php
namespace Synapse\Custom\Ui\Component\Listing\Column;

use Magento\Ui\Component\Listing\Columns\Column;
use Magento\Framework\View\Element\UiComponent\ContextInterface;
use Magento\Framework\View\Element\UiComponentFactory;
use Magento\User\Model\UserFactory;

class Parents extends Column
{
    protected $userFactory;

    /**
     * @param ContextInterface $context
     * @param UiComponentFactory $uiComponentFactory
     * @param array $components
     * @param array $data
     * @param UserFactory $userFactory
     */
    public function __construct(
        ContextInterface $context,
        UiComponentFactory $uiComponentFactory,
		\Synapse\Custom\Model\SyncategoryFactory $syncfactory,
        array $components = [],
        array $data = [],
        UserFactory $userFactory
    ) {
        parent::__construct($context, $uiComponentFactory, $components, $data);
        $this->userFactory = $userFactory;
		$this->syncfactory = $syncfactory;
    }

    /**
     * Prepare Data Source
     *
     * @param array $dataSource
     * @return array
     */
    public function prepareDataSource(array $dataSource)
    {
		 
        if (isset($dataSource['data']['items'])) {
            $fieldName = 'parent';
			
            foreach ($dataSource['data']['items'] as & $item) {
                if ($item[$fieldName] != '') {
					if($item[$fieldName]==0){
						 $item[$fieldName] = 'Parent Category';
					}else{
						$acustomerModel = $this->syncfactory->create();
						$data = $acustomerModel->load($item[$fieldName]);
						$customerName = $data->getName();
						$item[$fieldName] = $customerName;
					}
                }
            }
        }
        return $dataSource;
    }

}