begin
  require 'pry'
rescue e
  puts "no breaking bad"
end

CONSTRUQT_PATH=ENV['CONSTRUQT_PATH']||'../../../'
[
  "#{CONSTRUQT_PATH}/ipaddress/lib",
  "#{CONSTRUQT_PATH}/construqt/core/lib",
  "#{CONSTRUQT_PATH}/construqt/flavours/plantuml/lib",
  "#{CONSTRUQT_PATH}/construqt/flavours/nixian/lib",
  "#{CONSTRUQT_PATH}/construqt/flavours/ubuntu/lib",
  "#{CONSTRUQT_PATH}/construqt/flavours/mikrotik/lib"
].each{|path| $LOAD_PATH.unshift(path) }
require 'rubygems'
require 'construqt'
require 'construqt/flavour/plantuml.rb'

class CoreNet

  attr_accessor :network, :region

  def self.setup
    core_net = CoreNet.new

    Construqt::Flavour::Plantuml.add_format('png')
    core_net.network = Construqt::Networks.add('distille')
    core_net.network.set_domain("distille.construqt.net")
    core_net.network.set_contact("meno.abels.construqt.net")
    core_net.network.set_dns_resolver(core_net.network.addresses.set_name("NAMESERVER").
        add_ip("8.8.8.8").
        add_ip("8.8.4.4"), [core_net.network.domain])
    core_net.region = Construqt::Regions.add("scottland", core_net.network)
    core_net.network.add_ntp_server(core_net.region.network.addresses.
                                  add_ip("5.9.110.236").
                                  add_ip("178.23.124.2"))

    core_net.region.hosts.set_default_password('test4711')
    core_net.region.users.add("menabe", "group" => "admin", "full_name" => "Meno Abels", "public_key" => <<KEY, "email" => "meno.abels@construqt.net")
ssh-dss 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 abels@nure
KEY
    core_net.vagrant_host
    core_net
  end

  attr_reader :mac_wlan, :mac_usb_ether
  def vagrant_host
    @vagrant_host_cache ||= region.hosts.add("vagrant-host", "flavour" => "ubuntu") do |host|
      host.configip = host.id ||= Construqt::HostId.create do |my|
        my.interfaces << @mac_wlan = region.interfaces.add_bridge(host, "en0", "mtu" => 1500, "interfaces" => [])
      end
      @mac_usb_ether = region.interfaces.add_bridge(host, "en3", "mtu" => 1500, "interfaces" => [])
    end
  end

  def produce
    Construqt.produce(region)
  end

end




