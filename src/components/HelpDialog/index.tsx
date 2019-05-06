import * as React from 'react';
import './HelpDialog.css';

// Components
// Components - Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

// Images
import TodayViewLayoutImg from '../../img/png/today_view_layout.png';
import TodayViewLayoutCurrentImg from '../../img/png/today_view_layout_current.png';
import WeekListImg from '../../img/png/week-list.png';
import HowToReadRoomImg from '../../img/png/how-to-read-rooms.png';

type Props = {
  fullScreen: boolean,
  open: boolean,
  userType: string,
  code: string,
  toggleHelpDialog: () => {},
}

type State = {
  expanded: string,
}

type Help = {
  data: {
    title: string
  },
  blocks: (Header | Paragraph | List | Divider | Image)[]
}

type Header = {
  type: 'header',
  data : {
    text: string,
    level: number
  }
}

type Paragraph = {
  type: 'paragraph',
  data : {
    text: string
  }
}

type List = {
  type: 'list',
  data: {
    style: 'ordered' | 'unordered',
    items: string[]
  }
}

type Divider = {
  type: 'divider'
}

type Image = {
  type: 'image',
  data: {
    file : {
      url: string
    },
    caption?: string
  }
}

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: 'auto',
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,.1)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

// ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
}))(MuiExpansionPanelDetails);

class HelpDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expanded: ''
    };
  };

  handlePanelChange = (panel: any) => (event: any, expanded: any) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  getContent = () : Help[] => {
    return [
      {
        data: {
          title: `Today's schedule`
        },
        blocks: [
          {
            type: 'header',
            data: {
              text: `Layout`,
              level: 2
            }
          },
          {
            type: 'image',
            data: {
              file: {
                url: TodayViewLayoutImg
              },
              caption: `Figure 1. Example of a lesson in the today view`
            }
          },
          {
            type: 'paragraph',
            data: {
              text:
              `
                This layout shows the scheduly for today. The numbers left of the time are the
                periods. You can find details on the right of the line and dot. First you
                have the subject, next the class and teacher, and last the room. If any of
                the data is not available, the space will be used by data that is.
              `
            }
          },
          {
            type: 'image',
            data: {
              file: {
                url: TodayViewLayoutCurrentImg
              },
              caption: `Figure 2. Example of a current lesson in the today view`
            }
          },
          {
            type: 'paragraph',
            data: {
              text:
              `
                Lessons that are in porgress will have a red border and background, shown as in figure 2.
              `
            }
          },
        ]
      },
      {
        data: {
          title: `Weekly schedule`
        },
        blocks: [
          {
            type: 'header',
            data: {
              text: `Weekly and list layout`,
              level: 2
            }
          },
          {
            type: 'image',
            data: {
              file: {
                url: WeekListImg
              },
              caption: `Figure 1. Weekly and list layout`
            }
          },
          {
            type: 'paragraph',
            data: {
              text:
              `
                The weekly schedule provides two layouts, a weekly and list layout. The matrix
                provides a weekly overview, where as the list overview provides simply a
                list with lessons.
              `
            }
          },
          {
            type: 'paragraph',
            data: {
              text:
              `
                The difference between them is in the functionalities. You can see the
                relationships between the lessons in the weekly overview and with the list overview
                you can see lessons that fall at the same time, indicated with a +2 for example.
                They should be used hand in hand.
              `
            }
          },
        ]
      },
      {
        data: {
          title: `Rooms`
        },
        blocks: [
          {
            type: 'header',
            data: {
              text: `How should you read`,
              level: 2
            }
          },
          {
            type: 'image',
            data: {
              file: {
                url: HowToReadRoomImg
              },
              caption: `Figure 1. Room code example`
            }
          },
          {
            type: 'paragraph',
            data: {
              text: "Every room code has dots in it, acting as seperators for the wing, floor and room."
            }
          }
        ]
      },
      {
        data: {
          title: `Settings`
        },
        blocks: [
          {
            type: 'paragraph',
            data: {
              text:
              `
                In the settings, you can reset everything and change your teacher or class code.
              `
            }
          }
        ]
      },
      // {
      //   data: {
      //     title: `Example`
      //   },
      //   blocks: [
      //     {
      //       type: 'header',
      //       data: {
      //         text: `Header 1`,
      //         level: 1
      //       }
      //     },
      //     {
      //       type: 'paragraph',
      //       data: {
      //         text:
      //         `
      //           This is another paragraph
      //         `
      //       }
      //     },
      //     {
      //       type: 'header',
      //       data: {
      //         text: `Header 2`,
      //         level: 2
      //       }
      //     },
      //     {
      //       type: 'paragraph',
      //       data: {
      //         text:
      //         `
      //           This is another paragraph
      //         `
      //       }
      //     },
      //     {
      //       type: 'header',
      //       data: {
      //         text: `Header 3`,
      //         level: 3
      //       }
      //     },
      //     {
      //       type: 'paragraph',
      //       data: {
      //         text:
      //         `
      //           This is another paragraph
      //         `
      //       }
      //     },
      //     {
      //       type: 'paragraph',
      //       data: {
      //         text:
      //         `
      //           This is another paragraph
      //         `
      //       }
      //     },
      //     {
      //       type: 'divider',
      //     },
      //     {
      //       type: 'paragraph',
      //       data: {
      //         text:
      //         `
      //           This is another paragraph
      //         `
      //       }
      //     },
      //     {
      //       type: 'list',
      //       data: {
      //         style: 'ordered',
      //         items: [
      //           `Item 1`,
      //           `Item 2`,
      //           `Item 3`,
      //           `Item 4`,
      //         ]
      //       }
      //     },
      //     {
      //       type: 'list',
      //       data: {
      //         style: 'unordered',
      //         items: [
      //           `Item 1`,
      //           `Item 2`,
      //           `Item 3`,
      //           `Item 4`,
      //         ]
      //       }
      //     },
      //     {
      //       type: 'image',
      //       data: {
      //         file: {
      //           url: 'https://picsum.photos/1400/1300'
      //         },
      //         caption: ``
      //       }
      //     },
      //   ]
      // },
    ];
  }

  public render() {
    const { fullScreen, open } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={this.props.toggleHelpDialog}
        maxWidth={'sm'}
        className="Dialog-Help--container"
      >
        <DialogTitle id="responsive-dialog-title">{"Help"}</DialogTitle>
        <DialogContent className="Dialog-Help--content-container">
          {this.getContent().map((item, index) => (
            <ExpansionPanel
              square
              expanded={this.state.expanded === `${index}`}
              onChange={this.handlePanelChange(`${index}`)}
              key={index}
            >
              <ExpansionPanelSummary>
                <Typography>{item.data.title}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={`HelpDialog-content--container`}>
                {item.blocks.map((item, index) => (
                  <div key={index}>
                    {   item.type == 'header' ? (
                      <div>
                        {item.data.level == 1 ? (
                          <div className={`HelpDialog-content--${item.type}-${item.data.level}`}>
                            {item.data.text}
                          </div>
                        ) : item.data.level == 2 ? (
                          <div className={`HelpDialog-content--${item.type}-${item.data.level}`}>
                            {item.data.text}
                          </div>
                        ) : item.data.level == 3 ? (
                          <div className={`HelpDialog-content--${item.type}-${item.data.level}`}>
                            {item.data.text}
                          </div>
                        ) : null}
                      </div>
                    ) : item.type == 'paragraph' ? (
                      <p className={`HelpDialog-content--${item.type}`}>{item.data.text}</p>
                    ) : item.type == 'list' && item.data.style == 'ordered' ? (
                      <ol style={{ paddingLeft: '16px', marginTop: 0 }}>
                        {item.data.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ol>
                    ) : item.type == 'list' && item.data.style == 'unordered' ? (
                      <ul style={{ paddingLeft: '16px', marginTop: 0 }}>
                        {item.data.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : item.type == 'divider' ? (
                      <div className="HelpDialog--content-divider"></div>
                    ) : item.type == 'image' ? (
                      <figure className="HelpDialog--content-figure-container">
                        <img src={item.data.file.url} className={`HelpDialog--content-figure-${item.type}`} />
                        {item.data.caption != undefined ? (
                          <figcaption className="HelpDialog--content-figure-figcaption">{item.data.caption}</figcaption>
                        ) : null}
                      </figure>
                    ) : null}
                  </div>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.toggleHelpDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withMobileDialog()(HelpDialog) as any;