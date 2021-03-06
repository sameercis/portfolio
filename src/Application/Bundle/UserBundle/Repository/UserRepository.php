<?php

namespace Application\Bundle\UserBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * User Repository
 */
class UserRepository extends EntityRepository
{

    /**
     * Get all active users
     *
     * @return array
     */
    public function findAllActiveUsers()
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.enabled = :enable')
            ->setParameter('enable', true)
            ->andWhere('u.locked = :locked')
            ->setParameter('locked', false)
            ->orderBy('u.ordering', 'ASC')
            ->getQuery()
            ->getResult();
    }

}