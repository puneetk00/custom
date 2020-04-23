<?php
namespace Synapse\Custom\Controller\Adminhtml\Designpdf;
use Magento\Backend\App\Action\Context;
use Magento\Framework\App\Filesystem\DirectoryList;
use Magento\Framework\View\Result\PageFactory;
require_once('lib/TCPDF/TCPDF.php');

class Index extends \Magento\Backend\App\Action
{
  protected $_publicActions = ['index'];
	/**
     * @var PageFactory
     */
    protected $resultPageFactory;
	protected $orderItemRepository;
	protected $fileFactory;
	protected $_storeManager;
	protected $_urlInterface;
	protected $filesystem;
	protected $oldwidth_in;
	protected $oldheight_in;
	protected $width_in;
	protected $rd_old_width_in;
	protected $rd_old_oldheight_in;
	protected $_dir;

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
		\Magento\Framework\Filesystem\DirectoryList $dir,
		\Magento\Framework\App\Response\Http\FileFactory $fileFactory
    ) {
        $this->resultPageFactory = $resultPageFactory;
		$this->orderItemRepository = $orderItemRepository;
		$this->fileFactory = $fileFactory;
		$this->_storeManager = $storeManager;
		$this->filesystem = $filesystem;
        $this->_urlInterface = $urlInterface;
		$this->_dir = $dir;
        $this->oldwidth_in = (696/96); // normal card
        $this->oldheight_in = (408/96); // normal card
        $this->width_in = 3.6; // normal card
		$this->rd_old_width_in = (734/96); // rounded card
		$this->rd_old_oldheight_in = (446/96); // rounded card
		$this->rd_width_in = 3.8; // rounded card
		parent::__construct($context);
    }

    /**
     * @return \Magento\Framework\View\Result\Page
     */
    public function execute()
    {
		if($this->getRequest()->getParam('item_id')) {
			$item_id = $this->getRequest()->getParam('item_id');
			$itemCollection = $this->orderItemRepository->get($item_id);
			$cardJson = '';
			if($itemCollection->getJsonCard()) {
				
				$frontCardJson = $itemCollection->getJsonCard();
				$frontImage = $itemCollection->getJsonImage();
				$backImageBack = $itemCollection->getJsonImageBack();	
				$frontPrintData = $this->getCanvasJsonfile($frontCardJson);				
				
				$unit='in';
				$pdfType='_sample';
				if($frontPrintData->cardtype == 2){
					$pdfType='_rounded';
					$this->oldwidth_in = $this->rd_old_width_in;
					$this->oldheight_in = $this->rd_old_oldheight_in;;
					$this->width_in = $this->rd_width_in;
				}
				
					$oldwidth_in = $this->oldwidth_in;
					$oldheight_in = $this->oldheight_in;
					$aspectratio = ($oldheight_in/$oldwidth_in);
					$width_in = $this->width_in;
					$height_in = $aspectratio*$width_in;
				
				
				// /************ Round card properties *************/
				// $oldwidtdhsetby = 3.5;
				// $oldheighthsetby = 2;
				// $roundwidth = 3.5/$oldwidtdhsetby*$width_in; // inches
				// $roundheight = 2/$oldheighthsetby*$height_in; // inches
				// $roundradition = 0.1/$oldwidtdhsetby*$width_in; // inches
				// $cutarealeft = 0.03/$oldwidtdhsetby*$width_in; // inches
				// $cutareatop = 0.03/$oldwidtdhsetby*$width_in; // inches
				// $dotwidths = 0.01/$oldwidtdhsetby*$width_in; // inches
				// /************ Round card properties *************/
				
				/************ Round card properties *************/
				$roundwidth = 3.5;
				$roundheight = 2;
				$roundradition = 0.1;
				$cutarealeft = 0.15;
				$cutareatop = 0.15;
				$dotwidths = 0.01;
				/************ Round card properties *************/
				
				
				
				//$width_in = 596/96;
				//$height_in = 357/96;
				
				
				$format=array($width_in,$height_in);
				
				$pdf = new \TCPDF_TCPDF('', $unit, $format, true, 'UTF-8', false);
				
				
				
				//$pdf = new \TCPDF_TCPDF();
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
				// background image
				if(isset($frontPrintData->backgroundImage->src)){
					$backgroundImagePath = $frontPrintData->backgroundImage->src;
					//$backgroundImagePath =  $this->generateImage($frontPrintData->backgroundImage->src);
					$pdf->Image($backgroundImagePath, 0, 0, $width_in, $height_in, 'JPEG', '', '', true, 300, '', false, false, 0, false, false, true);
				} else {
					$pdf->Rect(0, 0, $width_in, $height_in, 'F', "",  array(255, 255, 255));
				}
								
				// Set Text and Image on PDF
				// create two array for store text & images information separately 
				$imageObjects = $textObjects = [];
				foreach ($frontPrintData->objects as $object) {
					if ($object->type == 'image') {
						$imageObjects[] = $object;
					} else if ($object->type == 'i-text' || $object->type == 'textbox') {
						$textObjects[] = $object;
					}
				}
				// add canvas image on pdf
				foreach ($imageObjects as $object) {
					$this->addImageToLarge($object, $pdf);
				}
				
				//echo "<pre>";
				//print_r($textObjects); die;
				// add canvas text on pdf
				foreach ($textObjects as $object) {
					$this->addTextToLarge($object, $pdf);
				} 
				
				/* if($frontPrintData->cardtype == 2){
				 $style6 = array('width' => $dotwidths, 'cap' => 'butt', 'join' => 'in', 'dash' => '0.5,0.5', 'color' => array(0, 0, 0));
					// Rounded rectangle
				 $pdf->RoundedRect($cutarealeft, $cutareatop, $roundwidth, $roundheight, $roundradition, '1111', null,$style6);
				} */
				
				// canvas backside
				$backCardJson = $itemCollection->getJsonCardBack();
				if($backCardJson) {
					$backPrintData = $this->getCanvasJsonfile($backCardJson);
					
					$pdf->AddPage();		
					// background image
					if(isset($backPrintData->backgroundImage->src)){
						$backsidegroundImgPath = $backPrintData->backgroundImage->src;
						
						//$backsidegroundImgPath =  $this->generateImage($backsideground_image_path);
						$pdf->Image($backsidegroundImgPath, 0, 0, $width_in, $height_in, 'JPG', '', '', true, 200, '', false, false, 0, false, false, true);
					} else {
						$pdf->Rect(0, 0, $width_in, $height_in, 'F', "",  array(255, 255, 255));
					}
									
					// Set Text and Image on PDF
					// create two array for store text & images information separately 
					$imageBackObjects = $textBackObjects = [];
					foreach ($backPrintData->objects as $object) {
						if ($object->type == 'image') {
							$imageBackObjects[] = $object;
						} else if ($object->type == 'i-text' || $object->type == 'textbox') {
							$textBackObjects[] = $object;
						}
					}
					// add canvas image on pdf
					foreach ($imageBackObjects as $object) {
						$this->addImageToLarge($object, $pdf);
					}
					// add canvas text on pdf
					foreach ($textBackObjects as $object) {
						$this->addTextToLarge($object, $pdf);
					} 
				}
				
				/*
				if($frontPrintData->cardtype == 2){
				
				  $style6 = array('width' => $dotwidths, 'cap' => 'butt', 'join' => 'in', 'dash' => '0.5,0.5', 'color' => array(0, 0, 0));
				 // Rounded rectangle
				  $pdf->RoundedRect($cutarealeft, $cutareatop, $roundwidth, $roundheight, $roundradition, '1111', null,$style6);
				
				} */
				
				
				// generate PDF
				$baseUrl = $this->_storeManager->getStore()->getBaseUrl();
				$time_stamp = time();
				$local_path = $this->_dir->getPath('var').'/orderpdf/'.$time_stamp.'.pdf';
				$pdf->Output($local_path, 'F');			
				$pdf->Close();
				
				$file_name = $time_stamp.$pdfType.'.pdf';
				//$url = $base_url.'/sites/all/modules/custom/collateral_design_system/files/preview'.$file_name;
		  
				// Header content type 
				header('Content-type: application/pdf'); 			
				header('Content-Disposition: inline; filename="' . $file_name . '"'); 				  
				header('Content-Transfer-Encoding: binary'); 				  
				header('Accept-Ranges: bytes'); 				  
				// Read the file 
				@readfile($local_path); 				
			}
		}		
    }
	
	/**
	*
	*/
	public function addImageToLarge($object, $pdf) {
		
		/**************Card reduce size asset *****************/
		$oldwidth_in = $this->oldwidth_in;
		$oldheight_in = $this->oldheight_in;
		$aspectratio = ($oldheight_in/$oldwidth_in);
		$width_in = $this->width_in;
		$height_in = $aspectratio*$width_in;
		/**************Card reduce size asset *****************/
		
		$pdf->StartTransform();
		if (!empty($object->src)) {
			
			$left = ($object->left) / (96);
			$left = $left/$oldwidth_in*$width_in;
			$top = ($object->top) / (96);
			$top = $top/$oldheight_in*$height_in;
			
							
			if($left < 0 ){$left *= -1;}
			if($top < 0 ){$top *= -1;}
			
			$width = ($object->width * $object->scaleX) / (96);
			$width = $width/$oldwidth_in*$width_in;
			$height = ($object->height * $object->scaleY) / (96);
			$height = $height/$oldheight_in*$height_in;
			$pdf->setXY($left, $top);
			
			$pdf->Rotate(360-$object->angle);
			$link_url = isset($object->associatedUrl) ? $object->associatedUrl: '';
			//set Transform
			$pdf->SetAlpha($object->opacity);
			//$imagePath =  $this->generateImage($object->src);
			$imagePath =  $object->src;
			
			$pdf->Image($imagePath, $left, $top, $width , $height, '',$link_url, '', false, 300, '', false, false, 0);		//Restore Transform
			$pdf->SetAlpha();
			$pdf->StopTransform();
		}		
	}
	
	public function generateImage($img) {
		$mediaDirectory = $this->filesystem->getDirectoryRead(DirectoryList::MEDIA);
		$destinationPath = $mediaDirectory->getAbsolutePath('carddesign/files/');
				
        $image_parts = explode(";base64,", $img);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $file = $destinationPath . uniqid() . '.png';
        file_put_contents($file, $image_base64);
		return $file;
    }
	
	/**
	*
	*/
	public function addTextToLarge($object, $pdf) {
		/**************Card reduce size asset *****************/
		$oldwidth_in = $this->oldwidth_in;
		$oldheight_in = $this->oldheight_in;
		$aspectratio = ($oldheight_in/$oldwidth_in);
		$width_in = $this->width_in;
		$height_in = $aspectratio*$width_in;
		/**************Card reduce size asset *****************/
		
		$pdf->StartTransform();
		
		$left = ($object->left)/(96);
		$left = $left/$oldwidth_in*$width_in;
		$top = ($object->top)/(96);
		$top = $top/$oldheight_in*$height_in;
		
		
						
		if($left < 0 ){$left *= -1;}
		if($top < 0 ){$top *= -1;}
			
		$width = ($object->width * $object->scaleX) / (96)*72;
		$width = $width/$oldwidth_in*$width_in;
		
		$height = ($object->height * $object->scaleY) / (96)*72;
		$height = $height/$oldheight_in*$height_in;
		
		//$width = ($object->width * $object->scaleX) / 96;
		//$height = ($object->height * $object->scaleY) / 96;
		
		

		$align = $style = $font_weight= $font_decoration = '';
		$align = $object->textAlign ? substr(ucwords($object->textAlign),0,1): '';
		$style = $object->fontStyle == 'italic' ? 'I': '';
		$font_weight = $object->fontWeight == 'bold' ? 'B': '' ;
		$font_decoration = ($object->underline) ? 'U': '' ;
		
		try {
			$newColor = $object->fill;
			$color = $this->hexToRgb($newColor);
			$pdf->setXY($left, $top);
			$pdf->Rotate(360-$object->angle);
			
			$pdf->SetCellPadding(0);
			$objspacing = $object->charSpacing;
			if( $objspacing != 0 ){
				//$spacing = $object->charSpacing/96;
				//$pdf->setFontStretching(110);
			}
			$spacing = $object->charSpacing/96;
	
			$pdf->setFontSpacing($spacing);
			//$pdf->setCellHeightRatio(1.296648);
			$pdf->setCellHeightRatio($object->lineHeight);
						
			
			$get_fontsize = ($object->fontSize*$object->scaleY/ (96))*72; //convert to 'pt'
			$get_fontsize = $get_fontsize/$oldwidth_in*$width_in;
			$font_family = $object->fontFamily;
			
			/** Set Font Style */
			
			if($font_family == 'Roboto'){
				$font_family = 'roboto';
				if($font_weight == 'B'&& $style == 'I' ){
					$font_family = 'robotobi';
					$font_weight == '';
				}else if($font_weight == 'B'){
				
					$font_family = 'robotob';
					$font_weight == 'B';
				} else if($style == 'I') {
					$font_family = 'robotoi';
					$style = '';
				}
			}else if($font_family == 'Roboto Condensed'){
				$font_family = 'robotocondensed';
				if($font_weight == 'B' && $style == 'I'){
					$font_family = 'robotocondensedbi';
					$font_weight = $style = '';
				}else if($font_weight == 'B'){
					$font_family = 'robotocondensedb';
					$font_weight = $style = '';
				}else if($style == 'I'){
					$font_family = 'robotocondensedi';
					$font_weight = $style = '';
				}
			}else if($font_family == 'Roboto-Bold'){
			  $font_family = 'robotob';
			}
			else if($font_family == 'RobotoCondensed-Regular'){
			  $font_family = 'robotocondensed';
			}
			else if($font_family == 'RobotoCondensed-Light'){
			  $font_family = 'robotocondensedlight';
			}
			/**
			* Open Sens
			*/
			if($font_family == 'Open Sans') {
				$font_family = 'opensans';
				if($font_weight == 'B'&& $style == 'I' ){
					$font_family = 'opensansbi';
					$font_weight == '';
				}else if($font_weight == 'B'){
					$font_family = 'opensansb';
					$font_weight == '';
				}else if($style == 'I'){
					$font_family = 'opensansi';
					$style == '';
				}
				
			}
			
			/**
			* Arial
			*/
			if($font_family == 'Arial') {
				$font_family = 'arial';
				if($font_weight == 'B'&& $style == 'I' ){
					$font_family = 'arialbi';
					$font_weight == '';
				}else if($font_weight == 'B'){
					$font_family = 'arialb';
					$font_weight == '';
				}else if($style == 'I'){
					$font_family = 'ariali';
					$style == '';
				}
				
			}
			

			if($font_family == 'MazdaType-BoldItalic') {
				$font_family = 'mazdatypebi';		
			}
			
			if($font_family == 'MazdaType-Italic') {
				$font_family = 'mazdatypei';		
			}
			
			if($font_family == 'Cadillac') {
				$font_family = 'cadillacserif';	
				if($font_weight == 'B'){
					$font_family = 'cadillacserif';
					$font_weight == '';
				}
			}
			
			if($font_family == 'Indie Flower') {
				$font_family = 'indieflower';		
			}
			
			if($font_family == 'MinionPro Regular') {
				$font_family = 'minionpro';		
			}
			
			if($font_family == 'MinionPro Bold') {
				$font_family = 'minionprob';		
			}
			
			if($font_family == 'MazdaType-Medium') {
				$font_family = 'mazdatypemedium';		
			}
			
			if($font_family == 'MazdaType-MediumItalic') {
				$font_family = 'mazdatypemediumi';		
			}
			
			if($font_family == 'Calibri Bold') {
				$font_family = 'calibrib';		
			}
			
			
			if($font_family == 'MazdaType-Regular') {
				$font_family = 'mazdatype';
				if($font_weight == 'B'&& $style == 'I' ){
					$font_family = 'mazdatypebi';
					$font_weight == '';
				}else if($font_weight == 'B'){
					$font_family = 'mazdatype';
					$font_weight == '';
				}else if($style == 'I'){
					$font_family = 'mazdatypei';
					$style == '';
				}
				
			}
			
			if($font_family == 'MyriadPro Regular') {
				$font_family = 'myriadpro';		
			}
			
			if($font_family == 'Helvetica-Normal') {
				$font_family = 'helvetica-normal';		
			}
			
			if($font_family == 'Helvetica Inserat LT Std') {
				$font_family = 'helveticainseratltstd';		
			}
			
			if($font_family == 'Helvetica Neue LT Std') {
				$font_family = 'helveticaneueltstdb';		
			}
			
					
			//$fontname = \TCPDF_FONTS::addTTFfont($fnt[$object->fontFamily], 'TrueTypeUnicode', '', 32);	
			
			$pdf->SetFont($font_family, $font_weight.$style.$font_decoration,$get_fontsize, '', true);
			
			//$pdf->SetFont('times', $font_weight.$style.$font_decoration, $get_fontsize,'', 'default', true);
			
			
			$pdf->SetTextColor($color[0], $color[1], $color[2]);	
			if(isset($object->fill->type)) {
				if($object->fill->type == 'linear'){
					$color1 = $object->fill->colorStops[0]->color;
					$color2 = $object->fill->colorStops[1]->color;
					$coords = $object->fill->coords;
					$pdf->LinearGradient(20, 45, 80, 80, $color1, $color2, $coords);
				}
			}
			
			if($object->shadow != null) {
				if(isset($object->shadow->offsetX)){
					$depth_w = $object->shadow->offsetX/(96);
					$depth_h = $object->shadow->offsetY/(96);
					//
					$pdf->setTextShadow(array('enabled' => true, 'depth_w' => $depth_w, 'depth_h' => $depth_h, 'color' => $this->hexToRgb($object->shadow->color), 'opacity' => 0.5, 'blend_mode' => 'Normal'));
				}
			}  else {
				$pdf->setTextShadow(array('enabled'=>false, 'depth_w'=>0, 'depth_h'=>0, 'color'=>array(255, 0, 0), 'opacity'=>0.1, 'blend_mode'=>'Normal'));
				
			} 
			
			$pdf->SetAlpha($object->opacity);
			$textbox_value = $object->text;
			$textbox_value = str_replace("\n","<br>",$textbox_value);
			$link_url = isset($object->associatedUrl) ? $object->associatedUrl: '';
			if($link_url){
				$textbox_value = '<a href="'.$link_url.'">'.$textbox_value.'</a>';
			}     
			
			
			//$pdf->Cell($width, $height, $object->text, 0, $align, false);
			$pdf->MultiCell($width, $height, $textbox_value, 0, $align, false, 1, '', '', true, 0, True, true, 0, 'T', false);
			$pdf->SetAlpha();					
			
		}catch (Exception $e) {
			echo $e->getMessage();
			exit();
		}
		$pdf->StopTransform();
	}
	
	
	
	/**
	*
	*/
	public function getCanvasJsonfile($convasData) {
		return json_decode($convasData);
		
	}
	
	//The greatest common divisor (GCD) 
	public function gcd($a, $b) {
		return $b ? gcd($b, $a % $b) : $a;
	}

	public function changeDpi($px) {
		//return ($px/96)*300;
		return $px;
	}

	/*
	* scale
	*/
	public function scale($px, $r1, $r2) {
		return $px * $r1 / $r2;
	}
	
	/**
	* color code
	*/
	public function hexToRgb($hex, $alpha = false) {
	   $hex    = str_replace('#', '', $hex);
	   $length   = strlen($hex);
	   $rgb[0] = hexdec($length == 6 ? substr($hex, 0, 2) : ($length == 3 ? str_repeat(substr($hex, 0, 1), 2) : 0));
	   $rgb[1] = hexdec($length == 6 ? substr($hex, 2, 2) : ($length == 3 ? str_repeat(substr($hex, 1, 1), 2) : 0));
	   $rgb[2] = hexdec($length == 6 ? substr($hex, 4, 2) : ($length == 3 ? str_repeat(substr($hex, 2, 1), 2) : 0));
	   if ( $alpha ) {
		  $rgb['a'] = $alpha;
	   }
	   return $rgb;
	}
}
