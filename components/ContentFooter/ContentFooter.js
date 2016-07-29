var React = require('react');

var browser   = require('../../extension/browser');
var config    = require('../../integrations/config');
var format    = require('../../utils/format');
var styles    = require('./ContentFooter.styles');
var urls      = require('../../integrations/urls');
var TimeSince = require('../TimeSince/TimeSince');

module.exports = React.createClass({
	displayName: 'ContentFooter',
	propTypes:   {
		content: React.PropTypes.object.isRequired
	},
	render: function() {
		return (
			<div className={styles.contentFooter}>
				<div className={styles.statsContainer}>
					<div className={styles.stats}>
						{this.props.content.stats && config.integrations[this.props.content.api].stats.map(function(stat) {
							if (this.props.content.stats[stat] === undefined) {
								return null;
							}
							// FIXME number-decorator
							return <span key={stat} className={styles.stat}><em title={this.props.content.stats[stat]}>{format.number(this.props.content.stats[stat])}</em> {browser.i18n.getMessage(stat + '_of_' + this.props.content.api) || browser.i18n.getMessage(stat)}</span>;
						}.bind(this))}
					</div>
				</div>
				<div>
					{ this.props.content.date && <TimeSince href={urls.print(this.props.content)} date={this.props.content.date} /> }
				</div>
			</div>
		);
	}
});
