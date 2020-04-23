<?php


namespace Synapse\Custom\Api\Data;

interface SyntemplatesInterface extends \Magento\Framework\Api\ExtensibleDataInterface
{

    const IMAGE = 'image';
    const CATEGORY = 'category';
    const NAME = 'name';
    const SYNTEMPLATES_ID = 'syntemplates_id';
    const JSON = 'json';

    /**
     * Get syntemplates_id
     * @return string|null
     */
    public function getSyntemplatesId();

    /**
     * Set syntemplates_id
     * @param string $syntemplatesId
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface
     */
    public function setSyntemplatesId($syntemplatesId);

    /**
     * Get name
     * @return string|null
     */
    public function getName();

    /**
     * Set name
     * @param string $name
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface
     */
    public function setName($name);

    /**
     * Retrieve existing extension attributes object or create a new one.
     * @return \Synapse\Custom\Api\Data\SyntemplatesExtensionInterface|null
     */
    public function getExtensionAttributes();

    /**
     * Set an extension attributes object.
     * @param \Synapse\Custom\Api\Data\SyntemplatesExtensionInterface $extensionAttributes
     * @return $this
     */
    public function setExtensionAttributes(
        \Synapse\Custom\Api\Data\SyntemplatesExtensionInterface $extensionAttributes
    );

    /**
     * Get category
     * @return string|null
     */
    public function getCategory();

    /**
     * Set category
     * @param string $category
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface
     */
    public function setCategory($category);

    /**
     * Get image
     * @return string|null
     */
    public function getImage();

    /**
     * Set image
     * @param string $image
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface
     */
    public function setImage($image);
	/**
     * Get json
     * @return string|null
     */
    public function getJson();

    /**
     * Set json
     * @param string $json
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface
     */
    public function setJson($json);
}
