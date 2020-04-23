<?php


namespace Synapse\Custom\Model\Data;

use Synapse\Custom\Api\Data\SyncategoryInterface;

class Syncategory extends \Magento\Framework\Api\AbstractExtensibleObject implements SyncategoryInterface
{

    /**
     * Get syncategory_id
     * @return string|null
     */
    public function getSyncategoryId()
    {
        return $this->_get(self::SYNCATEGORY_ID);
    }

    /**
     * Set syncategory_id
     * @param string $syncategoryId
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface
     */
    public function setSyncategoryId($syncategoryId)
    {
        return $this->setData(self::SYNCATEGORY_ID, $syncategoryId);
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
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface
     */
    public function setName($name)
    {
        return $this->setData(self::NAME, $name);
    }

    /**
     * Retrieve existing extension attributes object or create a new one.
     * @return \Synapse\Custom\Api\Data\SyncategoryExtensionInterface|null
     */
    public function getExtensionAttributes()
    {
        return $this->_getExtensionAttributes();
    }

    /**
     * Set an extension attributes object.
     * @param \Synapse\Custom\Api\Data\SyncategoryExtensionInterface $extensionAttributes
     * @return $this
     */
    public function setExtensionAttributes(
        \Synapse\Custom\Api\Data\SyncategoryExtensionInterface $extensionAttributes
    ) {
        return $this->_setExtensionAttributes($extensionAttributes);
    }

    /**
     * Get parent
     * @return string|null
     */
    public function getParent()
    {
        return $this->_get(self::PARENT);
    }

    /**
     * Set parent
     * @param string $parent
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface
     */
    public function setParent($parent)
    {
        return $this->setData(self::PARENT, $parent);
    }

    /**
     * Get created_at
     * @return string|null
     */
    public function getCreatedAt()
    {
        return $this->_get(self::CREATED_AT);
    }

    /**
     * Set created_at
     * @param string $createdAt
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface
     */
    public function setCreatedAt($createdAt)
    {
        return $this->setData(self::CREATED_AT, $createdAt);
    }

    /**
     * Get updated_at
     * @return string|null
     */
    public function getUpdatedAt()
    {
        return $this->_get(self::UPDATED_AT);
    }

    /**
     * Set updated_at
     * @param string $updatedAt
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface
     */
    public function setUpdatedAt($updatedAt)
    {
        return $this->setData(self::UPDATED_AT, $updatedAt);
    }
}
