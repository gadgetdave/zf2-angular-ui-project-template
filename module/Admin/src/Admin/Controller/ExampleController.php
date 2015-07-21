<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Admin\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use MyApp\Controller\CrudController;

class ExampleController extends CrudController
{
    public function __construct()
    {
        $this->entityClass = 'Admin\Entity\Example';
        $this->viewConfig = [
            ViewConfig::TITLE         => 'Example',
            ViewConfig::GET_ITEMS_URL => '/admin/example/search',
            ViewConfig::CREATE_URL    => 'create',
            ViewConfig::STATE         => [
                ViewConfig::STATE_OTHERWISE_URL => '/',
                ViewConfig::STATE_ROUTES        => [
                    'index' => [
                        ViewConfig::STATE_ROUTES_URL          => "/",
                        ViewConfig::STATE_ROUTES_TEMPLATE_URL => '/assets/views/grid.html'
                    ],
                    'create' => [
                        ViewConfig::STATE_ROUTES_URL          => "/create",
                        ViewConfig::STATE_ROUTES_TEMPLATE_URL => 'create'
                    ],
                ]
            ],
            
            ViewConfig::GRID_OPTIONS => [
                ViewConfig::GRID_OPTIONS_COLUMN_DEFS => [
                    [
                        ViewConfig::GRID_OPTIONS_FIELD => 'exampleId'
                    ],
                    [
                        ViewConfig::GRID_OPTIONS_FIELD             => 'name',
                        ViewConfig::GRID_OPTIONS_HEADER_CELL_CLASS => 'blue'
                    ],
                ],
            ]
        ];
    }
}
