export const treeData = {

    basic_selection: [
        {
            value: 'parent 1',
            title: 'parent 1',
            iconType: 'faCaretDown',
            children: [
                {
                    value: 'parent 1-0',
                    title: 'parent 1-0',
                    iconType: 'faCaretDown',
                    children: [
                        {
                            value: 'leaf1',
                            title: 'leaf1',
                        },
                        {
                            value: 'leaf2',
                            title: 'leaf2',
                        },
                        {
                            value: 'leaf3',
                            title: 'leaf3',
                        },
                        {
                            value: 'leaf4',
                            title: 'leaf4',
                        },
                        {
                            value: 'leaf5',
                            title: 'leaf5',
                        },
                        {
                            value: 'leaf6',
                            title: 'leaf6',
                        },
                    ],
                },
                {
                    value: 'parent 1-1',
                    title: 'parent 1-1',
                    iconType: 'faCaretDown',
                    children: [
                        {
                            value: 'leaf11',
                            title: <b style={{ color: '#08c' }}>leaf11</b>,
                        },
                    ],
                },
            ],
        },
    ],
    multiple_selection: [
        {
            value: 'parent 1',
            title: 'parent 1',
            iconType: 'faCaretDown',
            children: [
                {
                    value: 'parent 1-0',
                    title: 'parent 1-0',
                    iconType: 'faCaretDown',
                    children: [
                        {
                            value: 'leaf1',
                            title: 'my leaf',
                        },
                        {
                            value: 'leaf2',
                            title: 'your leaf',
                        },
                    ],
                },
                {
                    value: 'parent 1-1',
                    title: 'parent 1-1',
                    iconType: 'faCaretDown',
                    children: [
                        {
                            value: 'sss',
                            title: <b style={{ color: '#08c' }}>sss</b>,
                        },
                    ],
                },
            ],
        },
    ],
    generate_selection: [
        {
            title: 'Node1',
            value: '0-0',
            iconType: 'faCaretDown',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-1',
                },
                {
                    title: 'Child Node2',
                    value: '0-0-2',
                },
            ],
        },
        {
            title: 'Node2',
            value: '0-1',
        },
    ],
    checkable_selection: [
        {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            iconType: 'faCaretDown',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                },
            ],
        },
        {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            iconType: 'faCaretDown',
            children: [
                {
                    title: 'Child Node3',
                    value: '0-1-0',
                    key: '0-1-0',
                },
                {
                    title: 'Child Node4',
                    value: '0-1-1',
                    key: '0-1-1',
                },
                {
                    title: 'Child Node5',
                    value: '0-1-2',
                    key: '0-1-2',
                },
            ],
        },
    ],
    treeline_selction: [
        {
            value: 'parent 1',
            title: 'parent 1',
            // icon: <CarryOutOutlined />,
            children: [
                {
                    value: 'parent 1-0',
                    title: 'parent 1-0',
                    // icon: <CarryOutOutlined />,
                    children: [
                        {
                            value: 'leaf1',
                            title: 'leaf1',
                            // icon: <CarryOutOutlined />,
                        },
                        {
                            value: 'leaf2',
                            title: 'leaf2',
                            // icon: <CarryOutOutlined />,
                        },
                    ],
                },
                {
                    value: 'parent 1-1',
                    title: 'parent 1-1',
                    // icon: <CarryOutOutlined />,
                    children: [
                        {
                            value: 'sss',
                            title: 'sss',
                            // icon: <CarryOutOutlined />,
                        },
                    ],
                },
            ],
        },
    ],
    placement_selection: [
        {
            value: 'parent 1',
            title: 'parent 1',
            iconType: 'faCaretDown',
            children: [
                {
                    value: 'parent 1-0',
                    title: 'parent 1-0',
                    iconType: 'faCaretDown',
                    children: [
                        {
                            value: 'leaf1',
                            title: 'leaf1',
                        },
                        {
                            value: 'leaf2',
                            title: 'leaf2',
                        },
                    ],
                },
                {
                    value: 'parent 1-1',
                    title: 'parent 1-1',
                    iconType: 'faCaretDown',
                    children: [
                        {
                            value: 'leaf3',
                            title: <b style={{ color: '#08c' }}>leaf3</b>,
                        },
                    ],
                },
            ],
        },
    ],
    max_count_selection: [
        {
            title: 'Parent 1',
            value: 'parent1',
            iconType: 'faCaretDown',
            children: [
                {
                    title: 'Child 1-1',
                    value: 'child1-1',
                },
                {
                    title: 'Child 1-2',
                    value: 'child1-2',
                },
            ],
        },
        {
            title: 'Parent 2',
            value: 'parent2',
            iconType: 'faCaretDown',
            children: [
                {
                    title: 'Child 2-1',
                    value: 'child2-1',
                },
                {
                    title: 'Child 2-2',
                    value: 'child2-2',
                },
            ],
        },
    ],
    prefix_suffix_selection: [
        {
            value: 'parent 1',
            title: 'parent 1',
            iconType: 'faCaretDown',
            children: [
                {
                    value: 'parent 1-0',
                    title: 'parent 1-0',
                    iconType: 'faCaretDown',
                    children: [
                        {
                            value: 'leaf1',
                            title: 'my leaf',
                        },
                        {
                            value: 'leaf2',
                            title: 'your leaf',
                        },
                    ],
                },
                {
                    value: 'parent 1-1',
                    title: 'parent 1-1',
                    iconType: 'faCaretDown',
                    children: [
                        {
                            value: 'sss',
                            title: <b style={{ color: '#08c' }}>sss</b>,
                        },
                    ],
                },
            ],
        },
    ],
    async_loading_selection: [],
    variants_selection: [
        {
            title: 'No data',
            value: 'no data',
            iconType: 'faFileImage',
        }
    ],
    status_selection: [
        {
            title: 'No data',
            value: 'no data',
            iconType: 'faFileImage',
        }
    ],
};