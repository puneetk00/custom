<?php


namespace Synapse\Custom\Api\Data;

interface SyncategoryInterface extends \Magento\Framework\Api\ExtensibleDataInterface
{

    const NAME = 'name';
    const PARENT = 'parent';
    const UPDATED_AT = 'updated_at';
    const CREATED_AT = 'created_at';
    const SYNCATEGORY_ID = 'syncategory_id';

    /**
     * Get syncategory_id
     * @return string|null
     */
    public function getSyncategoryId();

    /**
     * Set syncategory_id
     * @param string $syncategoryId
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface
     */
    public function setSyncategoryId($syncategoryId);

    /**
     * Get name
     * @return string|null
     */
    public function getName();

    /**
     * Set name
     * @param string $name
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface
     */
    public function setName($name);

    /**
     * Retrieve existing extension attributes object or create a new one.
     * @return \Synapse\Custom\Api\Data\SyncategoryExtensionInterface|null
     */
    public function getExtensionAttributes();

    /**
     * Set an extension attributes object.
     * @param \Synapse\Custom\Api\Data\SyncategoryExtensionInterface $extensionAttributes
     * @return $this
     */
    public function setExtensionAttributes(
        \Synapse\Custom\Api\Data\SyncategoryExtensionInterface $extensionAttributes
    );

    /**
     * Get parent
     * @return string|null
     */
    public function getParent();

    /**
     * Set parent
     * @param string $parent
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface
     */
    public function setParent($parent);

    /**
     * Get created_at
     * @return string|null
     */
    public function getCreatedAt();

    /**
     * Set created_at
     * @param string $createdAt
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface
     */
    public function setCreatedAt($createdAt);

    /**
     * Get updated_at
     * @return string|null
     */
    public function getUpdatedAt();

    /**
     * Set updated_at
     * @param string $updatedAt
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface
     */
    public function setUpdatedAt($updatedAt);
}
