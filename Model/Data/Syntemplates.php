<?php


namespace Synapse\Custom\Model\Data;

use Synapse\Custom\Api\Data\SyntemplatesInterface;

class Syntemplates extends \Magento\Framework\Api\AbstractExtensibleObject implements SyntemplatesInterface
{

    /**
     * Get syntemplates_id
     * @return string|null
     */
    public function getSyntemplatesId()
    {
        return $this->_get(self::SYNTEMPLATES_ID);
    }

    /**
     * Set syntemplates_id
     * @param string $syntemplatesId
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface
     */
    public function setSyntemplatesId($syntemplatesId)
    {
        return $this->setData(self::SYNTEMPLATES_ID, $syntemplatesId);
    }

    /**
     * Get name
     * @return string|null
     */
    public function getName()
    {
        return $this->_get(self::NAME);
    }

    /**
     * Set name
     * @param string $name
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface
     */
    public function setName($name)
    {
        return $this->setData(self::NAME, $name);
    }

    /**
     * Retrieve existing extension attributes object or create a new one.
     * @return \Synapse\Custom\Api\Data\SyntemplatesExtensionInterface|null
     */
    public function getExtensionAttributes()
    {
        return $this->_getExtensionAttributes();
    }

    /**
     * Set an extension attributes object.
     * @param \Synapse\Custom\Api\Data\SyntemplatesExtensionInterface $extensionAttributes
     * @return $this
     */
    public function setExtensionAttributes(
        \Synapse\Custom\Api\Data\SyntemplatesExtensionInterface $extensionAttributes
    ) {
        return $this->_setExtensionAttributes($extensionAttributes);
    }

    /**
     * Get category
     * @return string|null
     */
    public function getCategory()
    {
        return $this->_get(self::CATEGORY);
    }

    /**
     * Set category
     * @param string $category
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface
     */
    public function setCategory($category)
    {
        return $this->setData(self::CATEGORY, $category);
    }

    /**
     * Get image
     * @return string|null
     */
    public function getImage()
    {
        return $this->_get(self::IMAGE);
    }

    /**
     * Set image
     * @param string $image
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface
     */
    public function setImage($image)
    {
        return $this->setData(self::IMAGE, $image);
    }
	/**
     * Get json
     * @return string|null
     */
    public function getJson()
    {
        return $this->_get(self::JSON);
    }

    /**
     * Set json
     * @param string $json
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface
     */
    public function setJson($json)
    {
        return $this->setData(self::JSON, $json);
    }
}
