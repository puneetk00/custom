<?php
namespace Synapse\Custom\Controller\Adminhtml\Designpdf;
use Magento\Backend\App\Action\Context;
use Magento\Framework\App\Filesystem\DirectoryList;
use Magento\Framework\View\Result\PageFactory;
require_once('lib/TCPDF/TCPDF.php');

class Htmlprint extends \Magento\Backend\App\Action
{
  protected $_publicActions = ['htmlprint'];
	/**
     * @var PageFactory
     */
    protected $resultPageFactory;
	protected $orderItemRepository;
	protected $fileFactory;
	protected $_storeManager;
	protected $_urlInterface;
	protected $filesystem;

    /**
     * @param Context $context
     * @param PageFactory $resultPageFactory
     */
    public function __construct(
        Context $context,
		\Magento\Sales\Api\OrderItemRepositoryInterface $orderItemRepository,
        PageFactory $resultPageFactory,
		\Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Framework\UrlInterface $urlInterface,
		\Magento\Framework\Filesystem $filesystem,
		\Magento\Framework\App\Response\Http\FileFactory $fileFactory
    ) {
        $this->resultPageFactory = $resultPageFactory;
		$this->orderItemRepository = $orderItemRepository;
		$this->fileFactory = $fileFactory;
		$this->_storeManager = $storeManager;
		$this->filesystem = $filesystem;
        $this->_urlInterface = $urlInterface;
		parent::__construct($context);
    }

    /**
     * @return \Magento\Framework\View\Result\Page
     */
    public function execute()
    {
		
		if($this->getRequest()->getParam('item_id')) {
			$item_id = $this->getRequest()->getParam('item_id');
			$html = '<style>#name{color:red;}</style><table class="card" border="0" cellpadding="1" align="center">
						<tbody>
							<tr id="name">
								<td>Name</td>
								<td>Trilok Gupta</td>
							</tr>
							<tr id="email">
								<td>Email</td>
								<td>trilokg@synapseindia.email</td>
							</tr>
							<tr id="phone">
								<td>Phone</td>
								<td></td>
							</tr>
							<tr id="fax">
								<td>Fax</td>
								<td>5555555</td>
							</tr>
							<tr id="website">
								<td>Website</td>
								<td>www.gmail.com</td>
							</tr>
						</tbody>
					</table>';
					
			$unit='in';
			$oldwidth_in = (696/96);
			$oldheight_in = (408/96);
			$aspectratio = ($oldheight_in/$oldwidth_in);
			$width_in = 3.5;
			$height_in = $aspectratio*3.5;
			$format=array($width_in,$height_in);
			$pdf = new \TCPDF_TCPDF('', $unit, $format, true, 'UTF-8', false);
			$pdf->SetCreator(PDF_CREATOR);
			$pdf->SetMargins(0, 0, 0, true);
			$pdf->SetLeftMargin(0);
			$pdf->SetRightMargin(0);
			$pdf->SetHeaderMargin(0);
			$pdf->SetFooterMargin(0);

			$pdf->setPrintFooter(false);
			$pdf->setPrintHeader(false);
			// set auto page breaks false
			$pdf->SetAutoPageBreak(false, 0);
			
			
			$pdf->AddPage();
			$pdf->writeHTML($html, true, false, true, false, '');		
			$pdf->Output('example_006.pdf', 'D'); //I,D,F,S,FI,FD,E
				
		}		
    }
	
	 
}
